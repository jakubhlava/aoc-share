import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import * as zod from "zod";
import { getServerSession } from "#auth";

const prisma = new PrismaClient();

const submissionInputBodyModel = zod.object({
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
    day: zod
        .number()
        .min(1, "Day must be greater than 0")
        .max(25, "Day must be less than 26"),
    event: zod.number().min(2015, "Event year must be greater than 2015"),
});

export default defineEventHandler(async (event) => {
    const session: Session | null = await getServerSession(event);
    const webhook = process.env.DISCORD_ANNOUNCE_WEBHOOK;

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

    const submissionInput = submissionInputBodyModel.parse(body);
    const {
        language,
        content,
        description,
        day,
        event: year,
    } = submissionInput;

    const submission = await prisma.submission.create({
        data: {
            language,
            content,
            description,
            day,
            eventId: year,
            userId: user.id,
        },
    });

    if (webhook != null) {
        await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "(Advent of) Code Storage",
                embeds: [
                    {
                        title: `New submission by ${user.name}`,
                        description: `Day ${day} of Advent of Code ${year}\nLook at the submission [here](https://aoc.jakubh.cz/submission/${submission.id}/)`,
                        footer: {
                            text: `Submission #${submission.id}`,
                        },
                    },
                ],
            }),
        });
    }

    return submission;
});
