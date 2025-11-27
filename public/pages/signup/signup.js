import { createUsers } from "../../../api/signup/userCreateRequest.js";
import { getURL } from "../../../api/signup/userImageUrlRequest.js";
import { uploadS3 } from "../../../api/signup/userImageUrlRequest.js";
import { checkEmail } from "../../../api/signup/userEmailCheckRequest.js";
import { checkNickname } from "../../../api/signup/userNicknameCheckRequest.js";
import { mountHeader } from "../../component/header.js";

await mountHeader({ hideBack:false, hideAvatar:true, avatarSrc:null });

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const backbtn = document.getElementById("backBtn");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordChkInput = document.getElementById("passwordChk");
const nicknameInput = document.getElementById("nickname");
const profileInput = document.getElementById("profile-image");

const helpers = document.querySelectorAll(".helper");
const emailHelper = document.getElementById("email-helper");
const passwordHelper = document.getElementById("password-helper");
const passwordChkHelper = document.getElementById("passwordChk-helper");
const nicknameHelper = document.getElementById("nickname-helper");
const imageHelper = document.getElementById("image-helper");

const profileImg = document.getElementById("profile-img");
const caption = document.getElementById("profile-image-caption");


backbtn.addEventListener("click", () => {
    window.location.href = "/public/pages/login/login.html";
})

loginBtn.addEventListener("click", () => {
    window.location.href = "/public/pages/login/login.html";
});

emailInput.addEventListener("blur", async () => {
    const email = emailInput.value.trim();
    if(!email){
        emailHelper.textContent = "*이메일을 입력하세요.";
        emailHelper.style.color = "red";
        return;
    }
    const available = await checkEmail(email);
    if(available){
        emailHelper.textContent = "사용할 수 있는 이메일입니다."
        emailHelper.style.color = "grey";
    } else{
        emailHelper.textContent = "*이미 사용자가 있습니다."
        emailHelper.style.color = "red";
    }
})

nicknameInput.addEventListener("blur", async () => {
    const nickname = nicknameInput.value.trim();
    if(!nickname){
        nicknameHelper.textContent = "*닉네임을 입력하세요.";
        nicknameHelper.style.color = "red";
        return;
    }
    const available = await checkNickname(nickname);
    if(available){
        nicknameHelper.textContent = "사용할 수 있는 닉네임입니다."
        nicknameHelper.style.color = "grey";
    } else{
        nicknameHelper.textContent = "*이미 사용자가 있습니다."
        nicknameHelper.style.color = "red";
    }
})

profileInput.addEventListener("change", () => {
    const file = profileInput.files[0];

    if (!file) {
        imageHelper.textContent = "*프로필 사진을 추가해주세요.";
        imageHelper.style.color = "red";
        return;
    }

    const imageUrl = URL.createObjectURL(file);
    profileImg.src = imageUrl;
    profileImg.hidden = false;
    caption.hidden = true;

    imageHelper.textContent = "";
})

signupBtn.addEventListener("click", async () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordChck = passwordChkInput.value.trim();
    const nickname = nicknameInput.value.trim();
    const file = profileInput.files[0];
  
    helpers.forEach(helper => {
        helper.textContent = "";
      });
  
    let filled = true;
    if(!email){
        emailHelper.textContent = "*이메일을 입력하세요.";
        emailHelper.style.color = "red";
        filled = false;
    }
    if(!password){
        passwordHelper.textContent = "*비밀번호를 입력해주세요.";
        passwordHelper.style.color = "red";
        filled = false;
    }
    if(!passwordChck){
        passwordChkHelper.textContent = "*비밀번호를 한번 더 입력해주세요.";
        passwordChkHelper.style.color = "red";
        filled = false;
    }
    if(!nickname){
        nicknameHelper.textContent = "*닉네임을 입력해주세요.";
        nicknameHelper.style.color = "red";
        filled = false;
    }
    if(!file){
        imageHelper.textContent = "*프로필 사진을 추가해주세요.";
        imageHelper.style.color = "red";
        filled = false;
    }

    if(!filled){return;}
  
    // 백엔드 통신
    const {uploadUrl, fields} = await getURL(file.name, file.type, true);
    console.log(uploadUrl);
    console.log(fields.key);

    // S3 업로드
    let imageUrl;
    const uploaded = await uploadS3(uploadUrl, file, fields);
    if (uploaded) {
        //imageUrl = `${uploadUrl}${fields.key}`;
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/KakaoTalk_logo.svg/960px-KakaoTalk_logo.svg.png?20190617212005";
        console.log(imageUrl);
    } else {
        alert("사진이 서버로 제대로 전송되지 않았습니다.");
        return;
    }

    const userId = await createUsers(email, password, nickname, imageUrl);
    if (userId > 0){
        alert(`회원가입이 정상적으로 완료되었습니다. userId = ${userId}`);
        window.location.href = "/public/pages/login/login.html";
    } else {
        alert("오류가 발생했습니다.");
    }
})