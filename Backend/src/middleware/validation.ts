import { Context, Next } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError, ZodSchema } from "zod";
import { createErrorResponse } from "../utils";
import { ValidationOptions, ValidationTarget } from "../types/validation";

export function validationMiddleware(
    schemaOrOptions: ZodSchema | ValidationOptions
) {
    return async (c: Context, next: Next) => {
        try {
            let validationTargets: ValidationTarget[] = [];

            if ('parse' in schemaOrOptions) {
                validationTargets.push({
                    source: 'body',
                    schema: schemaOrOptions as ZodSchema,
                });
            } else {
                const options = schemaOrOptions as ValidationOptions;

                if (options.body) {
                    validationTargets.push({ source: 'body', schema: options.body });
                }
                if (options.query) {
                    validationTargets.push({ source: 'query', schema: options.query });
                }
                if (options.params) {
                    validationTargets.push({ source: 'params', schema: options.params });
                }
                if (options.headers) {
                    validationTargets.push({ source: 'headers', schema: options.headers });
                }
            }

            const validatedData: Record<string, any> = {};
            const errors: Record<string, string[]> = {};

            for (const target of validationTargets) {
                try {
                    let data: any;

                    switch (target.source) {
                        case 'body':
                            data = await c.req.json().catch(() => ({}));
                            break;
                        case 'query':
                            data = Object.fromEntries(
                                new URL(c.req.url).searchParams.entries()
                            );
                            break;
                        case 'params':
                            data = c.req.param();
                            break;
                        case 'headers':
                            data = Object.fromEntries(
                                Object.entries(c.req.header()).map(([key, value]) => [
                                    key.toLowerCase(),
                                    value,
                                ])
                            );
                            break;
                    }

                    console.log(data);

                    const validated = target.schema.parse(data);
                    validatedData[target.source] = validated;
                } catch (error) {
                    if (error instanceof ZodError) {
                        errors[target.source] = formatZodErrors(error);
                    } else {
                        errors[target.source] = [`Invalid ${target.source} format`];
                    }
                }
            }

            if (Object.keys(errors).length > 0) {
                throw new HTTPException(400, {
                    message: 'Validation failed',
                    cause: errors,
                });
            }

            c.set('validated', validatedData);

            await next();
        } catch (error) {
            if (error instanceof HTTPException) {
                const response = createErrorResponse(
                    error.message,
                    error.cause
                );
                return c.json(response, error.status);
            }

            const response = createErrorResponse(
                'Validation error occurred',
                400
            );
            return c.json(response, 400);
        }
    };
};

function formatZodErrors(error: ZodError): string[] {
    return error.errors.map((err) => {
        const path = err.path.length > 0 ? err.path.join('.') : 'root';

        switch (err.code) {
            case 'invalid_type':
                return `${path}: Expected ${err.expected}, received ${err.received}`;
            case 'invalid_string':
                if (err.validation === 'email') {
                    return `${path}: Invalid email format`;
                }
                if (err.validation === 'url') {
                    return `${path}: Invalid URL format`;
                }
                if (err.validation === 'uuid') {
                    return `${path}: Invalid UUID format`;
                }
                return `${path}: Invalid string format`;
            case 'too_small':
                if (err.type === 'string') {
                    return `${path}: Must be at least ${err.minimum} characters`;
                }
                if (err.type === 'number') {
                    return `${path}: Must be at least ${err.minimum}`;
                }
                if (err.type === 'array') {
                    return `${path}: Must contain at least ${err.minimum} items`;
                }
                return `${path}: Value too small`;
            case 'too_big':
                if (err.type === 'string') {
                    return `${path}: Must be at most ${err.maximum} characters`;
                }
                if (err.type === 'number') {
                    return `${path}: Must be at most ${err.maximum}`;
                }
                if (err.type === 'array') {
                    return `${path}: Must contain at most ${err.maximum} items`;
                }
                return `${path}: Value too big`;
            case 'invalid_enum_value':
                return `${path}: Invalid value. Expected: ${err.options.join(', ')}`;
            case 'custom':
                return `${path}: ${err.message}`;
            default:
                return `${path}: ${err.message}`;
        }
    });
}