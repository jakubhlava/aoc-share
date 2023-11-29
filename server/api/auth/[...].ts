import DiscordProvider from "next-auth/providers/discord";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
    secret: process.env.NUXT_AUTH_SECRET,
    providers: [
        DiscordProvider.default({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
        }),
    ],
});
