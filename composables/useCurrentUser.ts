export const useCurrentUser = async () => {
    const headers = useRequestHeaders(["cookie"]) as HeadersInit;
    const { data } = await useFetch("/api/user/info", { headers });
    return data;
};
