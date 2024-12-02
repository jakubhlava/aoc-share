import { PrismaClient } from "@prisma/client";
import * as zod from "zod";
import { Session } from "next-auth";
import { getServerSession } from "#auth";

const prisma = new PrismaClient();

const submissionEditInputBodyModel = zod.object({
    language: zod.enum([
        "python",
        "php",
        "cpp",
        "csharp",
        "java",
        "javascript",
    ]),
    content: zod.string().min(1, "Submission content is mandatory"),
    description: zod.string(),
});

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

    const body = await readBody(event);

    const submissionInput = submissionEditInputBodyModel.parse(body);
    const { language, content, description } = submissionInput;

    const id = getRouterParam(event, "id");

    const submission = await prisma.submission.findFirst({
        where: {
            id: parseInt(id ?? "-1"),
            userId: user.id,
        },
    });

    if (submission == null) {
        throw createError({ statusMessage: "Not found", statusCode: 404 });
    }

    await prisma.submission.update({
        where: {
            id: submission.id,
        },
        data: {
            language,
            content,
            description,
        },
    });

    return submission;
});
