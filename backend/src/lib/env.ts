import { z } from "zod";

const rawEnv = {
    ...process.env,
    CLERK_PUBLISHABLE_KEY:
        process.env.CLERK_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    IMAGEKIT_PRIVATE_KEY:
        process.env.IMAGEKIT_PRIVATE_KEY ?? process.env.IMAGEKIT_PRIVATE_SECRET,
    WEBHOOK_SIGNING_KEY:
        process.env.WEBHOOK_SIGNING_KEY ?? process.env.CLERK_WEBHOOK_SECRET,
    SENTERY_DSN:
        process.env.SENTERY_DSN ?? process.env.SENTRY_DSN,
    SENTRY_DSN:
        process.env.SENTRY_DSN ?? process.env.SENTERY_DSN,
};

const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url(),

    CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    WEBHOOK_SIGNING_KEY: z.string().min(1),

    FRONTEND_URL: z.string().url(),

    POLAR_ACCESS_TOKEN: z.string().min(1),
    POLAR_WEBHOOK_SECRET: z.string().min(1),
    POLAR_API_BASE: z.string().url().default("https://api.polar.sh"),
    POLAR_CHECKOUT_PRODUCT_ID: z.string(),


    IMAGEKIT_PUBLIC_KEY: z.string().min(1),
    IMAGEKIT_PRIVATE_KEY: z.string().min(1),
    IMAGEKIT_URL_ENDPOINT: z.string().url(),

});

export type Env = z.infer<typeof envSchema>;

export function loadEnv() {
    const parsed = envSchema.safeParse(rawEnv);


    return parsed.data;
}





