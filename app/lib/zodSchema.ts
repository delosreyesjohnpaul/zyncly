import { z } from "zod";

export const onboardingSchema = z.object({
    fullName: z.string().min(3).max(200),
    userName: z.string().min(3).max(200).regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username must contain only letters, numbers, and hyphens",
    }),
    
});

export function onboardingSchemaValidation(options?: {
    isUsernameUnique: () => Promise<boolean>;
}) {
    return z.object({
        username: z
        .string()
        .min(3)
        .max(200)
        .regex(/^[a-zA-Z0-9-]+$/, {
            message: "Username must contain only letters, numbers, and hyphens",
        }),
        
    })
}
