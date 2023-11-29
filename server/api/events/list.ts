import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const events = await prisma.event.findMany({
        select: {
            year: true,
        },
    });

    return events;
});
