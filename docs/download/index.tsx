import "./index.css";
import { ToolStack } from "../../theme/components/ToolStack";
import { useEffect, useMemo, useState } from "react";

import { FaPencil, FaArrowDown } from "react-icons/fa6";
import { SiLinux, SiWindows11 } from "react-icons/si";
import { AiFillAndroid } from "react-icons/ai";

interface Release {
  tag_name: string;
  assets: { name: string; browser_download_url: string }[];
}

interface CachedRelease {
  tag_name: string;
  assets: { name: string; browser_download_url: string }[];
  tt: number;
}

export default function Download() {
  const [release, setRelease] = useState<Release>();
  const [preRelease, setPRelease] = useState<Release>();

  useEffect(() => {
    const rInfo: CachedRelease = JSON.parse(localStorage.getItem("r") || "{\"tt\":0}");
    const prInfo: CachedRelease = JSON.parse(localStorage.getItem("pr") || "{\"tt\":0}");

    const isWithinOneHour = Date.now() - rInfo.tt < 3600000;

    if (isWithinOneHour) {
      setRelease(rInfo);
      setPRelease(prInfo);
    } else {

      (async () => {
        const releaseInfo: {
          tag_name: string;
          assets: { name: string; browser_download_url: string }[];
        } = await fetch(
          "https://api.github.com/repos/ahqsoftwares/tauri-ahq-store/releases/latest",
        )
          .then((data) => data.json())
          .then((d) => {
            console.log(d);
            return d;
          });

        localStorage.setItem("r", JSON.stringify({
          tag_name: releaseInfo.tag_name,
          assets: releaseInfo.assets,
          tt: Date.now()
        }));
        setRelease(releaseInfo);

        const preReleaseInfo: {
          tag_name: string;
          assets: { name: string; browser_download_url: string }[];
        } = await fetch(
          "https://api.github.com/repos/ahqsoftwares/tauri-ahq-store/releases",
        )
          .then((data) => data.json())
          .then((d) =>
            d.filter
              ? d.filter((d: { prerelease: boolean }) => d.prerelease)
              : [],
          )
          .then((data) => data[0] || { tag_name: "unknown", assets: [] });

        localStorage.setItem("pr", JSON.stringify({
          tag_name: preReleaseInfo.tag_name,
          assets: preReleaseInfo.assets,
          tt: Date.now()
        }));
        setPRelease(preReleaseInfo);
      })();
    }
  }, []);

  const data = useMemo(() => release?.assets || [], [release]);
  const alpha = useMemo(() => preRelease?.assets || [], [preRelease]);
  const win32 = navigator.userAgent.includes("Windows");
  const android = navigator.userAgent.includes("Android");
  const x64 = navigator.userAgent.includes("x64");

  return (
    <div className="dwn-page">
      {release != undefined && preRelease != undefined ? (
        <>
          <div className="tw-flex tw-flex-col tw-text-center tw-justify-center tw-items-center" style={{ "height": "calc(100vh - var(--rp-nav-height))" }}>
            <button className={win32 ? "win" : android ? "andy" : ""}>
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
                <button>Download Stable Setup</button>
                <button>Download Alpha Setup</button>
              </section>
            </div>
            <div>
              <h3>
                <SiWindows11 className="rounded-sm" size="2rem" color="#0079d6" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Windows (arm64)</span>
              </h3>
              <section>
                <button>Download Stable Setup</button>
                <button>Download Alpha Setup</button>
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
                <button>Download Stable Setup</button>
                <button>Download Alpha Setup</button>
              </section>
            </div>
            <div>
              <h3>
                <SiLinux className="rounded-sm" size="2rem" color="var(--rp-c-text-1)" />
                <span className="tw-ml-[12px] tw-text-[1.5rem] tw-my-auto">Linux (arm64)</span>
              </h3>
              <section>
                <button>Download Stable Setup</button>
                <button>Download Alpha Setup</button>
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
                <button>Download Stable Setup</button>
                <button>Download Alpha Setup</button>
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
              <span>Stable: v<strong>{release.tag_name}</strong></span>
              <span>Pre-Release: <strong>{preRelease.tag_name}</strong></span>
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
