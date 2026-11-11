import { spawn } from "node:child_process";

export const chrome = spawn("google-chrome", [
  "--remote-debugging-port=9222",
  "--user-data-dir=/tmp/cdp-node",
  "http://localhost:5175/stats/",
]);

chrome.on("error", (err) => {
  console.error("Failed to start Chrome:", err);
});

async function getTab() {
  while (true) {
    try {
      const response = await (await fetch("http://localhost:9222/json")).json();
      return response[0]; // Return the first tab
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

const tab = await getTab();

export const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((resolve) => (socket.onopen = resolve));

chrome.on("exit", (code, signal) => {
  if (code !== null) {
    console.log(`Chrome exited with code ${code}`);
  } else {
    console.log(`Chrome was killed by signal ${signal}`);
  }
});
