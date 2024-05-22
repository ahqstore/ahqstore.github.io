import { readdirSync, readFileSync, writeFileSync } from "fs";

/*
"/": "/en",
    "/en/announcements/[...slug]": "/announcements/[...slug]?en",
    "/es/announcements/[...slug]": "/announcements/[...slug]?es",
    "/hi/announcements/[...slug]": "/announcements/[...slug]?hi",
*/

let red = `"/": "/en",`;

const file = readFileSync("./astro.config").toString();
readdirSync("./src/content/docs/announcements")
  .map((f) => f.split(".")[0])
  .forEach((path) => {
    red = `${red}
    "/en/announcements/${path}": "/announcements/${path}?en",
    "/es/announcements/${path}": "/announcements/${path}?es",
    "/hi/announcements/${path}": "/announcements/${path}?hi",`;
  });

writeFileSync("./astro.config.mjs", file.replace("!@#%redirects$#@!", red));
