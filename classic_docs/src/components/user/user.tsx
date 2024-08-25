import { MdAccountCircle } from "react-icons/md";
import type { PubUser } from ".";
import { FaGithub } from "react-icons/fa";

export default function User(data: PubUser) {
  console.log(data);

  return (
    <div className="user-island">
      <div className="w-[98vw] mx-auto">
        <div>
          {data.pf_pic ? (
            <img src={data.pf_pic} width={125} height={125} />
          ) : (
            <MdAccountCircle width={"125px"} height={"125px"} />
          )}

          <section className="ml-5">
            <h1>{data.display_name || `User #${data.u_id}`}</h1>
            <h2>@{data.username}</h2>
          </section>
        </div>
      </div>
      <section className="pt-5">
        <h1>Linked accounts</h1>

        {data.linked_acc.length > 0 ? (
          data.linked_acc.map((acc) => (
            <a href={`https://github.com/${acc}`} target="_blank" key={acc}>
              <FaGithub />
              <span>@{acc}</span>
            </a>
          ))
        ) : (
          <h2 className="ml-3">No accounts found</h2>
        )}
      </section>
    </div>
  );
}
