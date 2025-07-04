import { h, render } from "https://esm.sh/preact";
import { useEffect, useState } from "https://esm.sh/preact/hooks";
import { html, getRepoNameFromUrl, LoadingSvg, POST, useSSE } from "./utils.js";

const App = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [username, setUsername] = useState("");
  const [pat, setPat] = useState("");

  const [currentRepoName, setCurrentRepoName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repoExists, setRepoExists] = useState(false);
  const [status, setStatus] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await POST("/fetch-repo", {
          repo_name: currentRepoName,
        });
        if (response.status === "success") {
          setRepoExists(true);
        }
      } catch (e) {}
    };
    if (currentRepoName) {
      fetchRepo();
    }
  }, [currentRepoName]);

  useSSE("/events", {
    onMessage: (data, event) => {
      console.log("=>", data);
      if (data && data.message !== "") {
        setStatus(data);
      }
      if (data && data.progress !== undefined) {
        setProgress(data.progress);
      }
    },
  });

  const handleRepoUrlChange = (event) => {
    console.log("handleRepoUrlChange", event.target.value);
    setRepoUrl(event.target.value);
    const repoName = getRepoNameFromUrl(event.target.value);
    if (repoName) {
      console.log("repoName", repoName);
      setCurrentRepoName(repoName);
    }
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePatChange = (event) => {
    setPat(event.target.value);
  };

  const submitIsDisabled = !repoUrl || isLoading;
  const syncIsDisabled = !repoUrl || isLoading;

  const handleSubmit = async () => {
    console.log("handleSubmit", repoUrl);
    if (submitIsDisabled) {
      return;
    }
    setIsLoading(true);
    setStatus({ message: "Cloning repo to /tmp/..." });
    await POST("/ingest", { repo_url: repoUrl, username, pat });
    setIsLoading(false);
  };

  const handleSync = async () => {
    if (syncIsDisabled) {
      return;
    }
    setIsLoading(true);
    setStatus(null);
    await POST("/process", { repo_url: repoUrl, username, pat });
    setIsLoading(false);
  };

  const renderProgressBar = () => {
    if (!status) return null;
    console.log("status", status);
    const showText = status.total_steps ? true : false;
    const stepPercentage = showText
      ? Math.min(100, Math.round((status.step / status.total_steps) * 100))
      : 0;
    const stepWidth = `${stepPercentage}%`;
    const progressWidth = `${progress}%`;

    return html`
      <div class="progress-container">
        <div class="progress-info">
          ${showText &&
          html`<div>Step ${status.step}/${status.total_steps}:</div>`}
          <div class="progress-message">${status.message}</div>
        </div>
        <div class="progress-bar steps-bar">
          <div class="steps-fill" style="width: ${stepWidth}"></div>
        </div>

        <div class="progress-bar progress-bar-small">
          <div
            class="progress-fill-small"
            style="width: ${progressWidth}"
          ></div>
        </div>
      </div>
    `;
  };

  return html`
    <div class="app-container">
      <div class="app-header">
        <h1>${currentRepoName ? currentRepoName : "gevity"}</h1>
      </div>
      <div class="app-body">
        <input
          type="text"
          placeholder="Repo URL"
          value=${repoUrl}
          onInput=${handleRepoUrlChange}
        />
        <div class="input-horizontal-container">
          <input
            type="text"
            placeholder="Username (optional)"
            value=${username}
            onInput=${handleUsernameChange}
          />
          <input
            type="text"
            placeholder="PAT (optional)"
            value=${pat}
            onInput=${handlePatChange}
          />
        </div>
        <button onClick=${handleSubmit} disabled=${submitIsDisabled}>
          ${isLoading
            ? html`<div class="loading"><${LoadingSvg} /></div>`
            : "Ingest Repo"}
        </button>
        ${repoExists &&
        html`<button onClick=${handleSync} disabled=${syncIsDisabled}>
          ${isLoading
            ? html`<div class="loading"><${LoadingSvg} /></div>`
            : "Sync Repo to Latest"}
        </button>`}
        ${status && renderProgressBar()}
      </div>
    </div>
  `;
};

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  render(h(App, null), document.getElementById("app"));
});
