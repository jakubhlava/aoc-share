import { Session } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const session: Session | null = await getServerSession(event);

    if (session != null && session.user != null && session.user.name != null) {
        const user = await prisma.user.findFirst({
            where: {
                name: session.user.name,
            },
        });

        if (user) {
            return user;
        }

        return prisma.user.create({
            data: {
                name: session.user.name,
                accessLevel: "user",
            },
        });
    }
    throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
});
