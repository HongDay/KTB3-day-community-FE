import { API_DOMAIN } from "../../config.js";
console.log(API_DOMAIN);
const API_URL = API_DOMAIN + "/auth";

export async function login(email, password) {
    console.log(API_DOMAIN);
    console.log(API_URL);
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
                password: password
            }),
            credentials: "include",
        });
        const json = await res.json();

        const message = json?.message ?? [];
        const data = json?.data ?? null;
        
        const accessToken = json?.data?.token ?? "";
        localStorage.setItem("accessToken", accessToken); // 임시

        console.log(data);
        console.log(message);

        if (data == null){return false;}
        else{
            sessionStorage.setItem("nickname", data?.nickname ?? "");
            sessionStorage.setItem("profileImg", data?.profileImage ?? "");
            return true;
        }

    } catch (err) {
        console.error(err);
        return false;
    }
}