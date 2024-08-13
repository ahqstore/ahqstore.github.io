import * as path from 'path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'AHQ Store',
  description: 'An Open Sourced Store Application',
  icon: '/favicon.png',
  logo: {
    light: '/favicon.png',
    dark: '/favicon.png',
  },
  globalStyles: path.join(__dirname, "./globals.css"),
  multiVersion: {
    default: "v2",
    versions: [
      "v1",
      "v2",
    ]
  },
  themeConfig: {
    searchPlaceholderText: "Search anything!",
    socialLinks: [
      { icon: 'github', mode: 'link', content: 'https://github.com/ahqstore' },
      { icon: "discord", mode: "link", content: "https://discord.gg/sxgr5dh2fz" },
      { icon: 'X', mode: 'link', content: "https://x.com/ahqsoftwares" },
      { icon: "github", mode: "link", content: "https://github.com/ahqsoftwares/tauri-ahq-store" },
      { icon: "youtube", mode: "link", content: "https://www.youtube.com/channel/UC5G8xgHA-bKftjcnPzt-BFw" }
    ],
    footer: {
      message: "©️ AHQ Store | Licensed under MIT | A Project by AHQ Softwares Non Profit | ✉️ ahqsecret@gmail.com"
    },
    enableContentAnimation: false
  },
});
