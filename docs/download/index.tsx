import "./index.css";
import { useEffect, useMemo, useState } from "react";

import { FaPencil, FaArrowDown, FaWrench } from "react-icons/fa6";
import { SiLinux, SiWindows11 } from "react-icons/si";
import { AiFillAndroid } from "react-icons/ai";
import { fetchData, FetchReleaseData } from "./fetch";

interface Release {
  prerelease: boolean;
  tag_name: string;
  asset: {
    win32: string;
    winArm: string;
    linux: string;
    linuxArm: string;
    android: string;
  }
}

export default function Download() {
  const [release, setRelease] = useState<FetchReleaseData>();

  useEffect(() => {
    (async () => {
      setRelease(await fetchData());
    })()
  }, []);

  const win32 = navigator.userAgent.includes("Windows");
  const android = navigator.userAgent.includes("Android");
  const x64 = navigator.userAgent.includes("x64");

  const launch = (a: "desktop" | "mobile", b: "preview" | "stable", asset: "win32" | "android" | "winArm" | "linux" | "linuxArm") => {
    if (release) {
      window.open(release[a][b].asset[asset], "_blank");
    }
  }

  return (
    <div className="dwn-page">
      {release != undefined ? (
        <>
          <div className="tw-flex tw-flex-col tw-text-center tw-justify-center tw-items-center" style={{ "height": "calc(100vh - var(--rp-nav-height))" }}>
            <button onClick={() => launch(android ? "mobile" : "desktop", "stable", win32 ? x64 ? "win32" : "winArm" : android ? "android" : x64 ? "linux" : "linuxArm")} className={win32 ? "win" : android ? "andy" : ""}>
              {win32 ? <SiWindows11 size="2rem" color="white" /> : android ? <AiFillAndroid size="2rem" color="white" /> : <SiLinux size="2rem" color="black" />}
              <span>Download for {win32 ? "Windows" : android ? "Android" : "Linux"} {android || x64 ? "" : "(arm64)"}</span>
            </button>
            <a href="#other" className="tw-flex tw-items-center tw-mt-2 tw-border-b-[1px]">Other Downloads <FaArrowDown className="tw-ml-1" /></a>
          </div>

          <h3 className="tw-text-3xl tw-mb-3">Other Downloads</h3>

          <div className="downloads">
            <div>
              <h3>
                <SiWindows11 className="rounded-sm" size="2rem" color="#0079d6" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Windows (x64)</span>
              </h3>
              <section>
                <button onClick={() => launch("desktop", "stable", "win32")}>Download Stable Setup</button>
                <button onClick={() => launch("desktop", "preview", "win32")}>Download Alpha Setup</button>
              </section>
            </div>
            <div>
              <h3>
                <SiWindows11 className="rounded-sm" size="2rem" color="#0079d6" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Windows (arm64)</span>
              </h3>
              <section>
                <button onClick={() => launch("desktop", "stable", "winArm")}>Download Stable Setup</button>
                <button onClick={() => launch("desktop", "preview", "winArm")}>Download Alpha Setup</button>
              </section>
            </div>
          </div>

          <div className="downloads">
            <div>
              <h3>
                <SiLinux className="rounded-sm" size="2rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Linux (x64)</span>
              </h3>
              <section>
                <button onClick={() => launch("desktop", "stable", "linux")}>Download Stable Setup</button>
                <button onClick={() => launch("desktop", "preview", "linux")}>Download Alpha Setup</button>
              </section>
            </div>
            <div>
              <h3>
                <SiLinux className="rounded-sm" size="2rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Linux (arm64)</span>
              </h3>
              <section>
                <button onClick={() => launch("desktop", "stable", "linuxArm")}>Download Stable Setup</button>
                <button onClick={() => launch("desktop", "preview", "linuxArm")}>Download Alpha Setup</button>
              </section>
            </div>
          </div>

          <div className="downloads">
            <div>
              <h3>
                <AiFillAndroid className="rounded-sm" size="2rem" color="#37ab6f" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Android</span>
              </h3>
              <section>
                <button onClick={() => launch("mobile", "stable", "android")}>Download Stable Setup</button>
                <button onClick={() => launch("mobile", "preview", "android")}>Download Alpha Setup</button>
              </section>
            </div>
            <div>
              <h3>
                <FaWrench size="1.8rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Build from source</span>
              </h3>
              <section>
                <button onClick={() => window.location.href = "/guide/building/"}>Read the guide</button>
              </section>
            </div>
          </div>

          <div className="tw-flex">
            <h3 className="design">
              <FaPencil size="2rem" />
              <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Versions</span>
            </h3>
          </div>
          <div className="tw-flex tw-mt-2 tw-mb-6">
            <h5 id="other" className="button font-normal black tw-flex tw-flex-col">
              <strong>Desktop</strong>
              <span>Stable: v<strong>{release.desktop.stable.tag_name}</strong></span>
              <span>Pre-Release: <strong>{release.desktop.preview.tag_name}</strong></span>

              <strong>Mobile</strong>
              <span>Stable: v<strong>{release.mobile.stable.tag_name}</strong></span>
              <span>Pre-Release: <strong>{release.mobile.preview.tag_name}</strong></span>
            </h5>
          </div>
        </>
      ) : (
        <div className="page-load">
          <span />
          <h2>Almost There...</h2>
        </div>
      )}
    </div>
  );
}

export const frontmatter = {
  pageType: "custom",
};

export type { Release }