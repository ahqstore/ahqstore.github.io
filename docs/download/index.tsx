import "./index.css";
import { useEffect, useState } from "react";

import { FaPencil, FaArrowDown } from "react-icons/fa6";
import { SiLinux } from "react-icons/si";
import { FaWindows as SiWindows11 } from "react-icons/fa6";


import { AiFillAndroid } from "react-icons/ai";
import { fetchData, FetchReleaseData } from "./fetch";
import { FaApple } from "react-icons/fa";

interface Release {
  prerelease: boolean;
  tag_name: string;
  assets: { name: string }[];
  asset: {
    win32: string;
    winArm: string;
    linux: {
      deb: string;
      rpm: string;
      appimg: string;
    };
    linuxArm: {
      deb: string;
      rpm: string;
      appimg: string;
    };
    android: string;
    androidArm: string;
  }
}

export default function Download() {
  const [release, setRelease] = useState<FetchReleaseData>();

  useEffect(() => {
    (async () => {
      setRelease(await fetchData());
    })()
  }, []);

  const win32 = navigator.userAgent.toLowerCase().includes("windows");
  const android = ["android", "samsung"].some((d) => navigator.userAgent.toLowerCase().includes(d));
  const x64 = navigator.userAgent.includes("x64");
  const apple = ["mac", "iphone", "ipad"].filter((x) => navigator.userAgent.toLowerCase().includes(x)).length != 0;

  const launch = (b: "preview" | "stable", typ: "win32" | "android" | "winArm" | "linux" | "linuxArm" | "androidArm", flavour: "rpm" | "deb" | "appimg" = "rpm") => {
    if (release) {
      const asset: string | { deb: string, rpm: string, appimg: string } = release[b].asset[typ];

      if (typeof (asset) == "string") {
        window.open(asset, "_blank");
      } else {
        window.open(asset[flavour], "_blank");
      }
    }
  }

  return (
    <div className="dwn-page">
      {release != undefined ? (
        <>
          <div className="tw-flex tw-flex-col tw-text-center tw-justify-center tw-items-center" style={{ "height": "calc(100vh - var(--rp-nav-height))" }}>
            <button onClick={() => launch("stable", win32 ? x64 ? "win32" : "winArm" : android ? "androidArm" : x64 ? "linux" : "linuxArm", "deb")} className={win32 ? "win" : android ? "andy" : ""}>
              {apple ? <FaApple size="2em" color="black" /> : win32 ? <SiWindows11 size="2rem" color="white" /> : android ? <AiFillAndroid size="2rem" color="white" /> : <SiLinux size="2rem" color="black" />}
              {apple ?
                <span>No Apple sadly, but we have 🍊</span>
                :
                <span>Download for {win32 ? "Windows" : android ? "Android (Arm/Arm64)" : "Linux"} {android ? "" : x64 ? "(x64)" : "(arm64)"} {!win32 && !android && "(.deb)"}</span>
              }
            </button>

            <a href="#other" className="tw-flex tw-items-center tw-mt-2 tw-border-b-[1px]">Other Downloads <FaArrowDown className="tw-ml-1" /></a>
          </div>

          <h3 className="tw-text-3xl tw-mb-3">Other Downloads</h3>

          <div className="downloads" id="other">
            <div>
              <h3>
                <SiWindows11 className="rounded-sm" size="2rem" color="#0079d6" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Windows (x64)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "win32")}>Download Stable Setup</button>
                <button onClick={() => launch("preview", "win32")}>Download Alpha Setup</button>
              </section>
            </div>
            <div>
              <h3>
                <SiWindows11 className="rounded-sm" size="2rem" color="#0079d6" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Windows (arm64)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "winArm")}>Download Stable Setup</button>
                <button onClick={() => launch("preview", "winArm")}>Download Alpha Setup</button>
              </section>
            </div>
          </div>

          <div className="downloads">
            <div>
              <h3>
                <SiLinux className="rounded-sm" size="2rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Linux (x64/.deb)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "linux", "deb")}>Download Stable</button>
                <button onClick={() => launch("preview", "linux", "deb")}>Download Alpha</button>
              </section>
            </div>
            <div>
              <h3>
                <SiLinux className="rounded-sm" size="2rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Linux (x64/.rpm)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "linux", "rpm")}>Download Stable</button>
                <button onClick={() => launch("preview", "linux", "rpm")}>Download Alpha</button>
              </section>
            </div>

          </div>
          <div className="downloads">
            <div>
              <h3>
                <SiLinux className="rounded-sm" size="2rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">[Unavailable] Linux (x64/.AppImage)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "linux", "appimg")}>Download Stable</button>
                <button onClick={() => launch("preview", "linux", "appimg")}>Download Alpha</button>
              </section>
            </div>

            <div>
              <h3>
                <SiLinux className="rounded-sm" size="2rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Linux (x64/.deb)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "linux", "deb")}>Download Stable</button>
                <button onClick={() => launch("preview", "linux", "deb")}>Download Alpha</button>
              </section>
            </div>

          </div>
          <div className="downloads">
            <div>
              <h3>
                <SiLinux className="rounded-sm" size="2rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Linux (x64/.rpm)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "linux", "rpm")}>Download Stable</button>
                <button onClick={() => launch("preview", "linux", "rpm")}>Download Alpha</button>
              </section>
            </div>
            <div>
              <h3>
                <SiLinux className="rounded-sm" size="2rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">[Unavailable] Linux (x64/.AppImage)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "linux", "appimg")}>Download Stable</button>
                <button onClick={() => launch("preview", "linux", "appimg")}>Download Alpha</button>
              </section>
            </div>
          </div>

          <div className="downloads">
            <div>
              <h3>
                <AiFillAndroid className="rounded-sm" size="2rem" color="#37ab6f" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Android (Arm/Arm64)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "androidArm")}>Download Stable Setup</button>
                <button onClick={() => launch("preview", "androidArm")}>Download Alpha Setup</button>
              </section>
            </div>
            <div>
              <h3>
                <AiFillAndroid className="rounded-sm" size="2rem" color="#37ab6f" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Android (Universal)</span>
              </h3>
              <section>
                <button onClick={() => launch("stable", "android")}>Download Stable Setup</button>
                <button onClick={() => launch("preview", "android")}>Download Alpha Setup</button>
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
            <h5 className="button font-normal black tw-flex tw-flex-col">
              <span>Stable: v<strong>{release.stable.tag_name}</strong></span>
              <span>Pre-Release: <strong>{release.preview.tag_name}</strong></span>
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