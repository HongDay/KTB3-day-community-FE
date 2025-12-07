export async function mountHeader({ hideBack=false, hideAvatar=false, avatarSrc } = {}) {

    if (!window.__headerTpl) {
      const html = await (await fetch("/public/component/header.html")).text();
      const div = document.createElement("div");
      div.innerHTML = html;
      window.__headerTpl = div.querySelector("#site-header");
    }
  
    const frag = window.__headerTpl.content.cloneNode(true);
    const header = frag.querySelector("header");
    const back   = frag.querySelector(".backBtn");
    const h1     = frag.querySelector(".title");
    const avatar = frag.querySelector(".avatar");
  
    h1.textContent = "LifeLogU";
    if (avatarSrc) avatar.src = avatarSrc;
  
    back.style.display   = hideBack   ? "none" : "";
    avatar.style.display = hideAvatar ? "none" : "";
  
    back.addEventListener("click", () => history.back());
  
    document.body.prepend(frag);
  }