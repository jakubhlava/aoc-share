import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const year = parseInt(getRouterParam(event, "year") ?? "0");
    const submissions = await prisma.submission.findMany({
        where: {
            eventId: year,
        },
        select: {
            id: true,
            user: {
                select: {
                    id: true,
                    name: true,
                    displayName: true,
                },
            },
            day: true,
        },
    });

    return submissions;
});
