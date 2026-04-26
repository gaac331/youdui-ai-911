import { useEffect, useRef } from "react";

/**
 * Home page - loads the original YO-AI bundled application
 * The original site is a pre-built React app with inline runtime + external JS/CSS
 * We load them dynamically to render the complete site
 */
export default function Home() {
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    // 清空 root
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = "";
    }

    // 加载样式
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "/assets/index-C0cBnklX.css";
    document.head.appendChild(cssLink);

    // 加载运行时脚本
    const runtimeScript = document.createElement("script");
    runtimeScript.src = "/manus-runtime.js";
    runtimeScript.onload = () => {
      const appScript = document.createElement("script");
      appScript.src = "/assets/index-C3DptrF-.js";
      appScript.onload = () => {
        injectCustomizations();
      };
      document.body.appendChild(appScript);
    };
    document.body.appendChild(runtimeScript);
  }, []);

  return null;
}

/** 在 bundle 渲染完成后，对 DOM 进行补丁修改 */
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

/** 在 Hero 区底部添加“立即下载”按钮 */
function addDownloadButton(container: HTMLElement) {
  // 防止重复添加
  if (document.getElementById("custom-download-btn")) return;

  const link = document.createElement("a");
  link.id = "custom-download-btn";
  link.href = "/download";
  link.textContent = "立即下载";
  link.style.cssText = `
    display: inline-block;
    background-color: #7c3aed;
    color: white;
    font-weight: bold;
    padding: 12px 32px;
    border-radius: 9999px;
    font-size: 18px;
    text-decoration: none;
    margin-top: 24px;
    transition: all 0.2s;
    cursor: pointer;
  `;
  link.onmouseenter = () => (link.style.backgroundColor = "#6d28d9");
  link.onmouseleave = () => (link.style.backgroundColor = "#7c3aed");

  container.appendChild(link);
}

/** 缩小 Footer 的上下内边距 */
function shrinkFooterPadding() {
  const footer = document.querySelector("footer");
  if (!footer) return;

  // 替换 pt-20 pb-8 为 py-6，保留其他类名
  footer.className = footer.className
    .replace(/pt-\d+/g, "")
    .replace(/pb-\d+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  footer.className += " py-6";
}
