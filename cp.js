import { copySync } from "fs-extra/esm";

const languages = ["es", "fr", "ko", "hi", "it", "zh", "de", "ja", "ru", "pl"];

languages.forEach((lang) => {
  copySync("./src/content/docs/en", `./src/content/docs/${lang}`);
});
