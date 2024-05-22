import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const path = window.location.search;

    const paths: { [key: string]: string } = {
      "?en": "English",
      "?es": "Español",
      "?hi": "हिंदी"
    };

    if (Object.keys(paths).includes(path)) {
      const id = paths[path] as string;

      document.querySelectorAll("a[role=\"tab\"]").forEach((i) => {
        if (i.innerHTML.trim() == id) {
          (i as HTMLAnchorElement).click();
        }
      });
    }
  }, []);

  return <></>;
}