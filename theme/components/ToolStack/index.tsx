import styles from "./toolstack.module.css";

interface Tool {
  name: string;
  url: string;
  logo: string;
  desc: string;
}

export function ToolStack({ tools }: { tools: Tool[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={styles.container}>
        <div className={styles.root}>
          {tools.map((tool, i) => (
            <a
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className={styles.wrapperLink}
              key={i.toString()}
            >
              <div className={styles.card}>
                <div className={styles.avatar}>
                  {tool.logo.startsWith("utf-") ? (
                    <span className={styles.utf}>
                      {tool.logo.replace("utf-", "")}
                    </span>
                  ) : (
                    <img className={styles.logo} src={tool.logo} alt="logo" />
                  )}
                </div>
                <div className={styles.mask} />
                <div className={styles.body}>
                  <div className={styles.name}>{tool.name}</div>
                  <div className={styles.desc}>{tool.desc}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
