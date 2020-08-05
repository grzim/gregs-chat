import io from "socket.io-client";
import {
  messageReceivedEvent,
  messageSendEvent,
  socketUrl,
  userAliasUpdateAttemptEvent,
  userAliasUpdateEvent,
} from "../../config";

export const getSocketAPI = () => {
  const socket = io.connect(socketUrl);
  return {
    send: (message) => (socket.emit(messageSendEvent, message), getSocketAPI),
    userAliasUpdate: ({ userAlias, userId }) => (
      socket.emit(userAliasUpdateAttemptEvent, { userAlias, userId }),
      getSocketAPI
    ),
    onMessageReceived: (callback) => (
      socket.on(messageReceivedEvent, callback), getSocketAPI
    ),
    onUserAliasUpdate: (callback) => (
      socket.on(userAliasUpdateEvent, callback), getSocketAPI
    ),
  };
};
