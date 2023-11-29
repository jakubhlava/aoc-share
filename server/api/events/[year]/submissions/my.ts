import { Session } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "#auth";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const session: Session | null = await getServerSession(event);
    const year = parseInt(getRouterParam(event, "year") ?? "0");

    if (session == null || session.user == null || session.user.name == null) {
        throw createError({
            statusMessage: "Unauthenticated",
            statusCode: 403,
        });
    }

    const submissions = await prisma.submission.findMany({
        where: {
            user: {
                name: session.user.name,
            },
            eventId: year,
        },
        select: {
            id: true,
            day: true,
        },
    });

    return submissions;
});
