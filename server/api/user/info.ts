import { connection } from "mongoose";
import { User } from "server/models/user";

export default defineEventHandler((event) => {
    const { status, data } = useAuth();

    if (status.value === "authenticated") {
        connection.collection<User>();
    }
});
