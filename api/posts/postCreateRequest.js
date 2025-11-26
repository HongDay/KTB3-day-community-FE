import { API_DOMAIN } from "../../config.js";
console.log(API_DOMAIN);
const API_URL = API_DOMAIN + "/posts";

export async function createPosts(title, content, imageUrl) {
    try {
        const url = new URL(API_URL);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content,
                imageUrl: imageUrl
            }),
            credentials: "include",
        });

        const json = await res.json();

        const postId = json?.data?.postId ?? [];

        return postId;
    } catch (err) {
        console.error(err);
        return -1;
    }
}