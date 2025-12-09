import { API_DOMAIN } from "../../config.js";
console.log(API_DOMAIN);
const API_URL = API_DOMAIN + "/posts";

export async function deletePosts(postId) {
    try {
        const url = new URL(`${API_URL}/${postId}`);
        const accessToken = localStorage.getItem("accessToken");

        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            credentials: "include",
        });
        
        return 1;
    } catch (err) {
        console.error(err);
        return 0;
    }
}