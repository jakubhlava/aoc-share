import DiscordProvider from "next-auth/providers/discord";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    providers: [
        DiscordProvider.default({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
});
