import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const year = parseInt(getRouterParam(event, "name") ?? "0");
    const days = await prisma.submission.aggregate({
        where: {
            eventId: year,
        },
        _count: {
            day: true,
        },
    });

    return days;
});
