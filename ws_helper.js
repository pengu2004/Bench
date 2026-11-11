import { socket } from "./setup.js";

let idCount = 1;
export const send = (method, params = {}) => {
  console.log("Sending message to chrome");
  const id = idCount;
  idCount++;
  socket.send(
    JSON.stringify({
      id,
      method,
      params,
    }),
  );
};
