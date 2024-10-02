"use server";

import { parseWithZod } from "@conform-to/zod";
import prisma from "./lib/db";
import { requireUser } from "./lib/hooks";
import { onboardingSchema, onboardingSchemaValidation } from "./lib/zodSchema";
import { redirect } from "next/navigation";

export async function OnboardingAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = await parseWithZod(formData, {
        schema: onboardingSchemaValidation({
            async isUsernameUnique() {
                const existingUsername = await prisma.user.findUnique({
                    where: {
                        userName: formData.get("userName") as string,
                    },
                });
                return !existingUsername;
            },
        }),
        async: true,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }



    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            userName: submission.value.userName,
            name: submission.value.fullName,
        },
    });

    return redirect("/onboarding/grant-id");
}

export async function SettingsAction(formData: FormData) {
    const session = await requireUser();
}