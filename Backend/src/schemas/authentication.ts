import z from "zod";

const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be at most 128 characters')
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    );

const emailSchema = z
    .string()
    .email('Invalid email format')
    .max(255, 'Email must be at most 255 characters');

const usernameSchema = z
    .string()
    .min(3, 'Username is required')
    .max(100, 'Username must be at most 100 characters')
    .regex(/^[a-zA-Z1-9'-]+$/, 'Username can only contain letters, numbers, hyphens, and apostrophes');

const nameSchema = z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters')
    .regex(/^[a-zA-Z'-]+$/, 'Name can only contain letters, hyphens, and apostrophes');

export const registerSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema,
    firstName: nameSchema,
    lastName: nameSchema,
});

export const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required'),
});