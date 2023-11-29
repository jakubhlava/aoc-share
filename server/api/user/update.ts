import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import * as zod from "zod";
import { getServerSession } from "#auth";

const prisma = new PrismaClient();

const updateBodyModel = zod.object({
    preferredLanguage: zod
        .enum(["python", "php", "cpp", "csharp", "java", "javascript"])
        .optional(),
    displayName: zod.string().max(64, "Display name too long").optional(),
});
export default defineEventHandler(async (event) => {
    const session: Session | null = await getServerSession(event);
    if (session != null && session.user != null && session.user.name != null) {
        const user = await prisma.user.findFirst({
            where: {
                name: session.user.name,
            },
        });

        const body = await readBody(event);

        const updateBody = updateBodyModel.parse(body);

        if (user) {
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id,
                },
                data: updateBody,
            });
            console.log(updatedUser);
            return updatedUser;
        }
    }
    throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
});
