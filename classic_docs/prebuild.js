import { readdirSync, writeFileSync } from "fs";

/*
"/": "/en",
    "/en/announcements/[...slug]": "/announcements/[...slug]?en",
    "/es/announcements/[...slug]": "/announcements/[...slug]?es",
    "/hi/announcements/[...slug]": "/announcements/[...slug]?hi",
*/
const texts = {
    hi: "लोड हो रहा है",
    en: "Loading",
    es: "Cargando"
};

const val = `---
title: {ldr}
template: splash
---

<meta http-equiv="refresh" content="0;url=/!@#pathname" />

<div className="page-load">
    <span />
    <h2>{ldr}...</h2>
</div>`

const pages = readdirSync("./src/content/docs/announcements")
  .map((f) => f.split(".")[0]);

pages.push("index");

pages.forEach((path) => {
    ["en", "hi", "es"].forEach((lang) => {
        const txt = texts[lang];

        writeFileSync(`./src/content/docs/${lang}/announcements/${path}.mdx`, val.replace(/{ldr}/g, txt).replace("!@#pathname", path != "index" ? `announcements/${path}?${lang}` : "announcements"));
    });
  });
