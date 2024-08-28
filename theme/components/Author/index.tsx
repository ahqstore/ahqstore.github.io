import "./author.css"

const authorMap: { [key: string]: [string, string, string] } = {
  "ahq": ["AHQ", "Founder", "/ahq.png"],
  "ahqstore": ["AHQ Store", "Project", "/logo.png"]
};

export default function Author({ author }: { author: string }) {
  const [name, desig, img] = authorMap[author];

  return <section className="author">
    <img src={img} />

    <nav>
      <span>{name}</span>
      <span>{desig}</span>
    </nav>
  </section>;
}