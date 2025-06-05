import { ZodSchema } from "zod";

export interface ValidationOptions {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
    headers?: ZodSchema;
}

export interface ValidationTarget {
    source: 'body' | 'query' | 'params' | 'headers';
    schema: ZodSchema;
}