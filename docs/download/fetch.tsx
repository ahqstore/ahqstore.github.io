import { Helmet } from "rspress/runtime";
import { Release } from ".";

export interface FetchReleaseData {
  stable: Release;
  preview: Release;
}

interface LatestJSON {
  platforms: {
    "linux-x86_64": {
      url: string;
    };
    "linux-aarch64": {
      url: string;
    }
  }
}

export default function Render() {
  return <Helmet>
    <meta http-equiv="refresh" content="0;url=/fetch" />
  </Helmet>;
}

async function fetchLatest(file: Release) {
  const regex = /AHQ\.Store\.Neo_([0-9.]*)_(amd64|arm64)\.deb/gm;

  const aarch64name = file.assets.find(
    (d) => d.name.endsWith(".deb")
  )!!.name;

  return regex.exec(aarch64name)!![1];
}

export async function get<T>(url: string): Promise<T> {
  return await fetch(`https://api.github.com/repos/${url}`)
    .then((data) => data.json());
}

const urlD = (tag_name: string, file: string) => `https://github.com/ahqstore/client/releases/download/${tag_name}/${file}`;

export async function fetchData(): Promise<FetchReleaseData> {
  const rInfo: { release: FetchReleaseData, time: number } = JSON.parse(localStorage.getItem("releaseItem") || "{\"release\":{},\"time\":0}");
  const isWithinOneHour = Date.now() - rInfo.time < 3600000;

  if (isWithinOneHour) {
    return rInfo.release;
  }

  let stable = await get<Release>("ahqstore/client/releases/latest");
  const stableVer = await fetchLatest(stable);

  stable.asset = {
    linux: {
      deb: urlD(stable.tag_name, `AHQ.Store.Neo_${stableVer}_amd64.deb`),
      rpm: urlD(stable.tag_name, `AHQ.Store.Neo-${stableVer}-1.x86_64.rpm`),
      appimg: ""
      // appimg: urlD(stable.tag_name, `AHQ.Store.Neo_${stableVer}_amd64.AppImage`),
    },
    linuxArm: {
      deb: urlD(stable.tag_name, `AHQ.Store.Neo_${stableVer}_arm64.deb`),
      rpm: urlD(stable.tag_name, `AHQ.Store.Neo-${stableVer}-1.aarch64.rpm`),
      appimg: ""
      // appimg: urlD(stable.tag_name, `AHQ.Store.Neo_${stableVer}_aarch64.AppImage`),
    },
    android: urlD(stable.tag_name, "ahqstore_universal-linux-android.apk"),
    androidArm: urlD(stable.tag_name, "ahqstore_arm-linux-android.apk"),
    win32: urlD(stable.tag_name, "ahqstore_setup_win32_amd64.exe"),
    winArm: urlD(stable.tag_name, "ahqstore_setup_win32_arm64.exe"),
  };

  let preview = await get<Release[]>("ahqstore/client/releases").then((d) => d.find((d) => d.prerelease)) as Release;

  const previewVer = await fetchLatest(preview);
  preview.asset = {
    linux: {
      deb: urlD(stable.tag_name, `AHQ.Store.Neo_${previewVer}_amd64.deb`),
      rpm: urlD(stable.tag_name, `AHQ.Store.Neo-${previewVer}-1.x86_64.rpm`),
      appimg: ""
      // appimg: urlD(stable.tag_name, `AHQ.Store.Neo_${previewVer}_amd64.AppImage`),
    },
    linuxArm: {
      deb: urlD(stable.tag_name, `AHQ.Store.Neo_${previewVer}_arm64.deb`),
      rpm: urlD(stable.tag_name, `AHQ.Store.Neo-${previewVer}-1.aarch64.rpm`),
      appimg: ""
      // appimg: urlD(stable.tag_name, `AHQ.Store.Neo_${previewVer}_aarch64.AppImage`),
    },
    android: urlD(preview.tag_name, "ahqstore_universal-linux-android.apk"),
    androidArm: urlD(preview.tag_name, "ahqstore_arm-linux-android.apk"),
    win32: urlD(preview.tag_name, "ahqstore_setup_win32_amd64.exe"),
    winArm: urlD(preview.tag_name, "ahqstore_setup_win32_arm64.exe"),
  };

  const resp = {
    preview,
    stable
  };

  localStorage.setItem("releaseItem", JSON.stringify({
    release: resp,
    time: Date.now()
  }));

  return resp;
}