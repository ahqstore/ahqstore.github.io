import {
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";

const write = (path = "./classic_docs/dist") => {
  readdirSync(path).forEach((entry) => {
    if (statSync(`${path}/${entry}`).isDirectory()) {
      mkdirSync(
        `./doc_build/v1/${path.replace("./classic_docs/dist", "")}/${entry}`
      );
      write(`${path}/${entry}`);
    } else {
      writeFileSync(
        `./doc_build/v1/${path.replace("./classic_docs/dist", "")}/${entry}`,
        readFileSync(`${path}/${entry}`)
      );
    }
  });
};
write();
