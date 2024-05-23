import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://ahqstore.github.io",
  integrations: [
    starlight({
      plugins: [
        starlightBlog({
          title: "Announcements",
          prefix: "announcements",
          authors: {
            ahqstore: {
              name: "AHQ Store",
              title: "Organization",
              picture: "/favicon.png",
            },
            ahq: {
              name: "AHQ",
              title: "Founder | Leading Developer",
              picture: "/ahq.png",
            },
          },
          recentPostCount: 15,
        }),
      ],
      favicon: "/favicon.png",
      title: "AHQ Store",
      customCss: ["./src/css/global.css"],
      lastUpdated: true,
      titleDelimiter: "-",
      locales: {
        en: {
          label: "English",
          lang: "en",
        },
        es: {
          label: "Español",
          lang: "es",
        },
        hi: {
          label: "हिंदी",
          lang: "hi",
        },
      },
      defaultLocale: "en",
      logo: {
        src: "./src/assets/logo.png",
        replacesTitle: true,
      },
      components: {
        LanguageSelect: "./src/components/lang.astro",
      },
      social: {
        "github": "https://github.com/ahqstore",
        "email": "mailto:ahqsecret@gmail.com",
        "x.com": "https://x.com/ahqsoftwares",
        "reddit": "https://www.reddit.com/r/AHQ_Softwares",
        "twitter": "https://twitter.com/ahqsoftwares",
        "instagram": "https://www.instagram.com/theofficialahqsoftwares",
        "mastodon": "https://mastodon.world/@ahqstore",
        "discord": "https://discord.gg/sxgr5dh2fz",
        "youtube": "https://www.youtube.com/channel/UC5G8xgHA-bKftjcnPzt-BFw",
      },
      sidebar: [
        {
          label: "Framework Guides",
          translations: {
            hi: "फ्रेमवर्क गाइड",
            es: "Guía de Frameworks",
          },
          badge: {
            text: "v2 Alpha",
            variant: "danger",
          },
          autogenerate: {
            directory: "framework",
          },
          collapsed: true,
        },
        {
          label: "Developers",
          translations: {
            hi: "डेवलपर",
            es: "Desarrolladores",
          },
          badge: {
            text: "v2 Alpha",
            variant: "danger",
          },
          autogenerate: {
            directory: "reference",
          },
          collapsed: true,
        },
        {
          label: "FAQ",
          translations: {
            hi: "सामान्य प्रश्न",
            es: "Preguntas Frecuentes",
          },
          autogenerate: {
            directory: "faq",
          },
          collapsed: true,
        },
      ],
    }),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    react({
      include: "./src/dash/*",
    }),
  ],
  redirects: {
    "/": "/en",
    "/reference": "/en/reference",
    "/en/announcements/ahq-store": "/announcements/ahq-store?en",
    "/es/announcements/ahq-store": "/announcements/ahq-store?es",
    "/hi/announcements/ahq-store": "/announcements/ahq-store?hi",
    "/en/announcements/v1": "/announcements/v1?en",
    "/es/announcements/v1": "/announcements/v1?es",
    "/hi/announcements/v1": "/announcements/v1?hi",
    "/en/announcements/v2": "/announcements/v2?en",
    "/es/announcements/v2": "/announcements/v2?es",
    "/hi/announcements/v2": "/announcements/v2?hi",
    "/en/announcements/win7-8": "/announcements/win7-8?en",
    "/es/announcements/win7-8": "/announcements/win7-8?es",
    "/hi/announcements/win7-8": "/announcements/win7-8?hi",
  },
  output: "static",
});
