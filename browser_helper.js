import { send } from "./ws_helper.js";

export async function clickText(text) {
  const expression = `(()=>{
const el=[...document.querySelectorAll('a')].find((e)=>e.innerText===${JSON.stringify(text)})
	el.click();
	return true})()`;
	//need to be chnaged
  const reply = await send("Runtime.evaluate", { expression });
}
export async function inputText(text,field){


}
