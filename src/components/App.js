import React from "react";
import Chat from "./chat/Chat";
import { getSocketAPI } from "../facade/chat";
function App() {
  return <Chat socketAPI={getSocketAPI()} />;
}

export default App;
