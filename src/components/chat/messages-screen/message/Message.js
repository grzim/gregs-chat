import React, { useEffect, useState } from "react";
import "./style.scss";
import { produceBubbleContent } from "../../../../utils/produceBubbleContent";

function Message({ author, text, time, isSynched, amIAuthor }) {
  const [bubble, setBubble] = useState([]);
  const bubbleClasses = `message bubble ${amIAuthor ? "me" : "you"} `;
  const containerClasses = `message-container author-${
    amIAuthor ? "me" : "you"
  } `;

  useEffect(() => {
    (async () => {
      setBubble(await produceBubbleContent(text));
    })();
  }, [text]);

  return (
    <div className={containerClasses}>
      <div className="wrapper">
        <div className="message-top-panel">
          <div className="author">
            <span>{author}, </span>
            <span className="time">{time}</span>
          </div>
        </div>
        <div className={bubbleClasses}>{bubble}</div>
        {amIAuthor && (
          <div className="is-synched">{isSynched ? "✔" : "⌛"}</div>
        )}
      </div>
    </div>
  );
}

export default Message;
