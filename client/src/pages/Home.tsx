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

    // Remove the Vite-generated root content and prepare for the original app
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = "";
    }

    // Load the original CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "/assets/index-CvLP4j0m.css";
    document.head.appendChild(cssLink);

    // Load the manus-runtime (React runtime + CSS-in-JS)
    const runtimeScript = document.createElement("script");
    runtimeScript.src = "/manus-runtime.js";
    runtimeScript.onload = () => {
      // After runtime loads, load the app bundle
      const appScript = document.createElement("script");
      appScript.src = "/assets/index-DCyJ7Jf_.js";
      document.body.appendChild(appScript);
    };
    document.body.appendChild(runtimeScript);
  }, []);

  return null;
}
