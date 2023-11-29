import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { getServerSession } from "#auth";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const session: Session | null = await getServerSession(event);

    if (session == null || session.user == null || session.user.name == null) {
        throw createError({
            statusMessage: "Unauthenticated",
            statusCode: 403,
        });
    }

    const user = await prisma.user.findFirst({
        where: {
            name: session.user.name,
        },
    });

    if (user == null) {
        throw createError({
            statusMessage: "Unauthenticated",
            statusCode: 403,
        });
    }

    const id = getRouterParam(event, "id");

    await prisma.submission.delete({
        where: {
            id: parseInt(id ?? "-1"),
            userId: user.id,
        },
    });

    return true;
});
