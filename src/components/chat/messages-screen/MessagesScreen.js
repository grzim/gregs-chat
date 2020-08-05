import React, { useEffect, useRef } from "react";
import "./style.scss";
import Message from "./message/Message";
import { getAuthor, parseTime, scrollToBottom } from "../../../utils/helpers";
import { fetchError } from "../../../utils/constants";

function MessagesScreen({
  messages,
  isTimeFormat12h,
  usersIdsWithAliases,
  userId,
}) {
  const bottomLine = useRef();
  useEffect(() => {
    bottomLine.current && scrollToBottom(bottomLine.current);
  });

  const content = [messages, userId].includes(fetchError)
    ? "Server error"
    : messages.map((message) => (
        <Message
          key={message.id}
          author={getAuthor(message.authorId, usersIdsWithAliases)}
          amIAuthor={
            usersIdsWithAliases[userId] ===
            usersIdsWithAliases[message.authorId]
          }
          time={parseTime(isTimeFormat12h, message.time)}
          text={message.text}
          isSynched={message.isSynched}
        />
      ));

  return (
    <div className="message-screen-container">
      {content}
      <hr className="bottom-line" ref={bottomLine} />
    </div>
  );
}

export default MessagesScreen;
