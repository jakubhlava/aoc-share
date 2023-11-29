import { Session } from "next-auth";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
    const webhook = process.env.DISCORD_ANNOUNCE_WEBHOOK;

    if (webhook == null) {
        throw createError({ statusMessage: "No webhook", statusCode: 500 });
    }

    const session: Session | null = await getServerSession(event);

    if (session == null || session.user == null || session.user.name == null) {
        throw createError({
            statusMessage: "Unauthenticated",
            statusCode: 403,
        });
    }

    const resp = await fetch(webhook, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: `Test webhook <@${session.user.name}>`,
        }),
    });

    console.log(await resp.body.read());

    return true;
});
