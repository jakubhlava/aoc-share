import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id");

    const submission = await prisma.submission.findFirst({
        where: {
            id: parseInt(id ?? "-1"),
        },
        include: {
            user: true,
        },
    });

    if (submission == null) {
        throw createError({ statusMessage: "Not found", statusCode: 404 });
    }

    return submission;
});
