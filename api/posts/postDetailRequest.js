import { API_DOMAIN } from "../../config.js";
console.log(API_DOMAIN);
const API_URL = API_DOMAIN + "/posts";

export async function fetchPostDetail(postId) {
    try {
        const url = new URL(`${API_URL}/${postId}`);
        const accessToken = localStorage.getItem("accessToken");

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        if (!res.ok) throw new Error("HTTP error " + res.status);

        const json = await res.json();

        const contents = json?.data ?? [];

        return contents;
    } catch (err) {
        console.error(err);
        return [];
    }
}