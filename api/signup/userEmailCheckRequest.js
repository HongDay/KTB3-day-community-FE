import { API_DOMAIN } from "../../config.js";
console.log(API_DOMAIN);
const API_URL = API_DOMAIN + "/users/availability/email";

export async function checkEmail(email) {
    try {
        const url = new URL(API_URL);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                email: email
            })
        });

        const json = await res.json();

        const available = json?.data?.availability ?? [];

        return available;
    } catch (err) {
        console.error(err);
        return -1;
    }
}

export default checkEmail;