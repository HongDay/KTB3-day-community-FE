import { API_DOMAIN } from "../../config.js";
console.log(API_DOMAIN);
const API_URL = API_DOMAIN + "/users";

export async function createUsers(email, password, nickname, profileImage) {
    try {
        const url = new URL(API_URL);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                nickname: nickname,
                profileImage: profileImage
            })
        });

        const json = await res.json();

        const location = json?.data?.location ?? [];
        const userId = location.split("/").pop();

        return userId;
    } catch (err) {
        console.error(err);
        return -1;
    }
}