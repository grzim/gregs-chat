import React, { useState } from "react";

import "./style.scss";
import { getEventValue, pipe, preventDefault } from "../../../utils/helpers";

const areCorrectBtnsPressed = (e) =>
  e.key === "Enter" && (e.ctrlKey || e.metaKey);

function InputPanel({ sendMessage, isKeyShortcutForSentActive }) {
  const [text, setText] = useState("");
  const clearInput = () => setText("");
  const sendMsgFromInput = (text) => {
    clearInput();
    sendMessage(text);
  };

  const updateMessage = pipe(preventDefault, getEventValue, setText);
  const sendOnShortcutPressed = (e) => {
    if (isKeyShortcutForSentActive && areCorrectBtnsPressed(e)) {
      sendMsgFromInput(text);
    }
  };

  return (
    <div className="input-panel-container">
      <input
        className="message-text"
        type="text"
        value={text}
        onKeyDown={sendOnShortcutPressed}
        onChange={updateMessage}
      />
      <button className="message-submit" onClick={() => sendMsgFromInput(text)}>
        send
      </button>
    </div>
  );
}

export default InputPanel;
