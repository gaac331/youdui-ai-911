import { useEffect, useRef } from "react";

export default function Home() {
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const root = document.getElementById("root");
    if (root) root.innerHTML = "";

    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "/assets/index-kwDX16tF.css";
    document.head.appendChild(cssLink);

    const runtimeScript = document.createElement("script");
    runtimeScript.src = "/manus-runtime.js";
    runtimeScript.onload = () => {
      const appScript = document.createElement("script");
      appScript.src = "/assets/index-BtsCiUAT.js";
      appScript.onload = () => injectCustomizations();
      document.body.appendChild(appScript);
    };
    document.body.appendChild(runtimeScript);
  }, []);

  return null;
}

function injectCustomizations() {
  const observer = new MutationObserver(() => {
    const downloadDiv = document.getElementById("download");
    if (downloadDiv) {
      observer.disconnect();
      addDownloadButton(downloadDiv);
      shrinkFooterPadding();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function addDownloadButton(container: HTMLElement) {
  if (document.getElementById("custom-download-btn")) return;
  const link = document.createElement("a");
  link.id = "custom-download-btn";
  link.href = "/download";
  link.textContent = "立即下载";
  link.style.cssText = "display:inline-block;background-color:#7c3aed;color:white;font-weight:bold;padding:12px 32px;border-radius:9999px;font-size:18px;text-decoration:none;margin-top:24px;cursor:pointer;transition:all 0.2s";
  link.onmouseenter = () => (link.style.backgroundColor = "#6d28d9");
  link.onmouseleave = () => (link.style.backgroundColor = "#7c3aed");
  container.appendChild(link);
}

function shrinkFooterPadding() {
  const footer = document.querySelector("footer");
  if (!footer) return;
  footer.className = footer.className.replace(/pt-\d+/g, "").replace(/pb-\d+/g, "").replace(/\s+/g, " ").trim() + " py-6";
}
