import { useEffect, useState } from "react";
import "./user.css";
import Loading from "./loading";
import Err from "./error";
import User from "./user";

interface PubUser {
  ahq_verified: boolean,
  dev: boolean,
  dis_acc: boolean,
  display_name: string,
  linked_acc: string[],
  pf_pic?: string,
  pub_email?: string,
  u_id: number,
  username?: string
}

export default function GetUser() {
  const id = window.location.search.replace(/\?/g, "");

  const [resp, setResp] = useState(<Loading />);

  useEffect(() => {
    fetch(`https://ahqstore-server.onrender.com/users/${id}`)
      .then((d) => {
        if (!d.ok) {
          throw new Error("");
        }
        return d;
      })
      .then((d) => d.json())
      .then((d) => d as PubUser)
      .then((d) => setResp(<User {...d} />))
      .catch((_) => setResp(<Err />));
  }, []);

  return <>
    {resp}
  </>;
}

export type { PubUser }