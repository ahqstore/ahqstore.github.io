import { Helmet } from "rspress/runtime";
import { Release } from ".";

export interface FetchReleaseData {
  desktop: {
    stable: Release;
    preview: Release;
  };
  mobile: {
    stable: Release;
    preview: Release;
  }
}

export default function Render() {
  return <Helmet>
    <meta http-equiv="refresh" content="0;url=/fetch" />
  </Helmet>;
}

export async function get<T>(url: string): Promise<T> {
  return await fetch(`https://api.github.com/repos/${url}`)
    .then((data) => data.json());
}

const urlD = (tag_name: string, file: string) => `https://github.com/ahqsoftwares/tauri-ahq-store/releases/download/${tag_name}/${file}`;
const urlM = (tag_name: string) => `https://github.com/ahqstore/android-client/releases/download/${tag_name}/app-universal.apk`;

export async function fetchData(): Promise<FetchReleaseData> {
  const rInfo: { release: FetchReleaseData, time: number } = JSON.parse(localStorage.getItem("releaseItem") || "{\"release\":{},\"time\":0}");
  const isWithinOneHour = Date.now() - rInfo.time < 3600000;

  if (isWithinOneHour) {
    return rInfo.release;
  }

  let stable = await get<Release>("ahqsoftwares/tauri-ahq-store/releases/latest");
  stable.asset = {
    linux: urlD(stable.tag_name, "ahqstore_setup_linux_amd64"),
    linuxArm: urlD(stable.tag_name, "ahqstore_setup_linux_arm64"),
    android: "",
    win32: urlD(stable.tag_name, "ahqstore_setup_win32_amd64.exe"),
    winArm: urlD(stable.tag_name, "ahqstore_setup_win32_arm64.exe"),
  };

  let preview = await get<Release[]>("ahqsoftwares/tauri-ahq-store/releases").then((d) => d.find((d) => d.prerelease)) as Release;
  preview.asset = {
    linux: urlD(preview.tag_name, "ahqstore_setup_linux_amd64"),
    linuxArm: urlD(preview.tag_name, "ahqstore_setup_linux_arm64"),
    android: "",
    win32: urlD(preview.tag_name, "ahqstore_setup_win32_amd64.exe"),
    winArm: urlD(preview.tag_name, "ahqstore_setup_win32_arm64.exe"),
  };

  let mobileStable = await get<Release>("ahqstore/android-client/releases/latest");
  mobileStable.asset = {
    linux: "",
    linuxArm: "",
    android: urlM(mobileStable.tag_name),
    win32: "",
    winArm: "",
  };

  let mobilePr = await get<Release[]>("ahqstore/android-client/releases").then((d) => d.find((d) => d.prerelease)) as Release;
  mobilePr.asset = {
    linux: "",
    linuxArm: "",
    android: urlM(mobilePr.tag_name),
    win32: "",
    winArm: "",
  };

  const resp = {
    desktop: {
      preview,
      stable
    },
    mobile: {
      stable: mobileStable,
      preview: mobilePr
    }
  };

  localStorage.setItem("releaseItem", JSON.stringify({
    release: resp,
    time: Date.now()
  }));

  return resp;
}