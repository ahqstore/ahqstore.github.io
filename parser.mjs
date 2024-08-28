import { readdirSync, readFileSync, writeFileSync } from "fs";
import { parse } from "yaml";

console.log(
  `# Announcement Parser

~ AHQ Store Documentation Team`
);

const meta = ["index", { type: "divider" }];
let index = `---
title: Announcements
---
import Author from "../../theme/components/Author";
import { Badge } from 'rspress/theme';

# Recent Announcements

<div className="announcements">`;

/**
 * @type {[string, string][]}
 */
let blogs = readdirSync("./docs/announcements/")
  .filter((x) => x != "index.mdx" && x != "_meta.json")
  .map((x) => [x.replace(".mdx", ""), x]);

blogs = blogs.sort(([, a], [, b]) => {
  // Get the frontmatter of a and b
  const textA = readFileSync(`./docs/announcements/${a}`)
    .toString()
    .split("---")[1];
  const textB = readFileSync(`./docs/announcements/${b}`)
    .toString()
    .split("---")[1];

  const { date: rawDateA } = parse(textA);
  const { date: rawDateB } = parse(textB);

  const dateA = new Date(rawDateA);
  const dateB = new Date(rawDateB);

  if (dateA < dateB) return 1;
  if (dateA > dateB) return -1;
  return 0;
});

blogs.forEach(([name, path], i) => {
  const text = readFileSync(`./docs/announcements/${path}`)
    .toString()
    .split("---")[1];

  /**
   * @type {{title: string, excerpt: string, tags: string[], authors: string[], date: string}}
   */
  const { title, excerpt, tags, authors, date } = parse(text);

  meta.push(name);
  if (i <= 4) {
    index += `
      <a href="/announcements/${name}">
        <h1>
          <strong>${date}:</strong>
          <span>${title}</span>
        </h1>
        <h2>${excerpt || "Read more by clicking it"}</h2>

        <div>
          ${authors.map((x) => `<Author author="${x}"/>`).join("\n")}
        </div>

        <div>
          ${tags.map((x) => `<Badge text="${x}" type="warning" />`).join(" ")}
        </div>
      </a>
    `;
  }
});

index += "</div>";

writeFileSync("./docs/announcements/index.mdx", index);

writeFileSync("./docs/announcements/_meta.json", JSON.stringify(meta, null, 2));
