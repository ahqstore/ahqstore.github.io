import { useEffect } from "react";

export default function Home() {
  const path = window.location.search;

  useEffect(() => {
    const code = path.replace("?code=", "");

    if (code.includes("&") || code.includes("=")) {
      window.location.pathname = "/dash";
    } else {
      window.open(`ahqstore://auth/${code}`, "_blank");
    }
  }, []);

  return <></>;
}
