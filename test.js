import { send } from "./ws_helper.js";
import { clickText } from "./browser_helper.js";
await send("Page.navigate", { url: "https://www.google.com" });
await clickText("Gmail");
