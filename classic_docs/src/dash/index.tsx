import { useEffect } from "react";

export default function Home() {
  const path = "https://github.com/login/oauth/authorize?client_id=0de123dbebc878d6c4c8&scope=user:read";

  useEffect(() => {
    window.location.href = path;
  }, []);

  return <></>;
}