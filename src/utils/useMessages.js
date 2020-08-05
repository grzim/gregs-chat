import React, { useEffect, useState } from "react";
import { awaitedFetch, getHistory, handleMessageSend, pipe } from "./helpers";
import { messageInserter } from "./messageInserter";

export const useMessages = (userId, socketAPI) => {
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState(null);
  const [messageFromServer, setMessageFromServer] = useState(null);

  useEffect(() => {
    if (!messageToSend) return;
    const allMessages = handleMessageSend(
      messages,
      messageToSend,
      userId,
      socketAPI.send
    );
    setMessages(allMessages);
  }, [messageToSend]);

  useEffect(() => {
    if (!messageFromServer) return;
    const insertMessage = messageInserter(messages, userId);
    pipe(insertMessage, setMessages)(messageFromServer);
  }, [messageFromServer]);

  useEffect(() => {
    (async () => setMessages(await awaitedFetch(getHistory)))();
    socketAPI.onMessageReceived(setMessageFromServer);
  }, []);
  return [messages, setMessageToSend];
};
