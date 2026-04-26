import { useEffect, useRef } from "react";

/**
 * Home page - loads the original YO·AI bundled application
 * The original site is a pre-built React app with inline runtime + external JS/CSS
 * We load them dynamically to render the complete site
 */
export default function Home() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = "";
    }

    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "/assets/index-C0cBnkNx.css";
    document.head.appendChild(cssLink);

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

  setTimeout(() => {
    const downloadDiv = document.getElementById("download");
    if (downloadDiv) {
      observer.disconnect();
      addDownloadButton(downloadDiv);
      shrinkFooterPadding();
    }
  }, 3000);
}

function addDownloadButton(downloadDiv: HTMLElement) {
  if (downloadDiv.querySelector("[data-custom-download]")) return;

  const btn = document.createElement("a");
  btn.href = "/download";
  btn.textContent = "立即下载";
  btn.setAttribute("data-custom-download", "true");
  Object.assign(btn.style, {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "1rem",
    background: "linear-gradient(135deg, #7B61FF, #4F9BFF)",
    padding: "0.75rem 2rem",
    fontSize: "1.125rem",
    fontWeight: "700",
    color: "#fff",
    textDecoration: "none",
    boxShadow: "0 4px 20px rgba(123,97,255,0.4)",
    transition: "opacity 0.2s",
    cursor: "pointer",
  });
  btn.addEventListener("mouseenter", () => (btn.style.opacity = "0.85"));
  btn.addEventListener("mouseleave", () => (btn.style.opacity = "1"));

  downloadDiv.appendChild(btn);
}

function shrinkFooterPadding() {
  const footer = document.querySelector("footer");
  if (!footer) return;
  footer.style.paddingTop = "2rem";
  footer.style.paddingBottom = "2rem";
}
