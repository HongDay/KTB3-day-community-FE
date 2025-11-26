import { LAMBDA_DOMAIN } from "../../config.js";
console.log(LAMBDA_DOMAIN);

const GET_API_URL = LAMBDA_DOMAIN;

export async function uploadS3(presigned, file, fields) {
    const formData = new FormData();
    
    Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);    
    })

    formData.append("file", file);

    const response = await fetch(presigned, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        console.log("Upload Success");
        return true;
    } else {
        console.error("Upload Failed", response.status, await response.text());
        return false;
    }
}

export async function getURL(fileName, contentType, isProfile) {
    try {
        const url = new URL(GET_API_URL);

        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                fileName: fileName,
                contentType: contentType,
                isProfile: isProfile
            }),
        });

        const json = await res.json();
        console.log(json);

        const uploadUrl = json?.uploadUrl ?? [];
        const fields = json?.fields ?? [];

        return {uploadUrl, fields};
    } catch (err) {
        console.error(err);
        return -1;
    }
}