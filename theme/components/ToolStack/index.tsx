import styles from './toolstack.module.css';

export function ToolStack() {
  const tools = [
    {
      name: "Free",
      url: "/#",
      logo: "utf-⭐",
      desc: "A store that is free to use!"
    }
  ];

  return (
    <div style={{ "display": "flex", "flexDirection": "column" }}>
      <h1 className={styles.store}>What else!</h1>
      <h2 className={styles.h2}>AHQ Store is a full fleged store app built to be open source</h2>
      <div className={styles.container}>
        <div className={styles.root}>
          {tools.map(tool => (
            <a
              href={tool.url}
              target="_blank"
              rel="noreferrer"
              className={styles.wrapperLink}
              key={tool.name}
            >
              <div className={styles.card}>
                <div className={styles.avatar}>
                  {tool.logo.startsWith("utf-") ? <span className={styles.utf}>{tool.logo.replace("utf-", "")}</span> : <img className={styles.logo} src={tool.logo} alt="logo" />}
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