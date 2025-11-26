import { API_DOMAIN } from "../../config.js";
console.log(API_DOMAIN);
const API_URL = API_DOMAIN + "/posts?size=5";

export async function fetchPosts(cursorId) {
    try {
        const url = new URL(API_URL);
        if (cursorId != null) url.searchParams.set("lastSeenId", String(cursorId));

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
            },
            credentials: "include",
        });

        const json = await res.json();

        const contents = json?.data?.items ?? json?.items ?? json?.contents ?? [];
        const hasNext  = json?.data?.hasNext ?? json?.hasNext ?? false;
        const nextCursorId = json?.data?.nextCursorId ?? null;

        return {contents, hasNext, nextCursorId};
    } catch (err) {
        console.error(err);
        return {contents: [], hasNext: false, nextCursorId};
    }
}