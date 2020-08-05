const host = "http://localhost";
const port = 3000;
const socketUrl = `${host}:${port}`;
const chatHistoryPath = `/chat-history`;
const chatHistoryUrl = `${host}:${port}${chatHistoryPath}`;
const firstAvailableUserIdPathWithAlias = `/next-id/:alias`;
const firstAvailableUserIdPath = `/next-id`;
const usersIdsAndAliasesPath = `/users-and-aliases`;
const usersIdsAndAliasesUrl = `${host}:${port}${usersIdsAndAliasesPath}`;
const getUserIdUrl = (alias = "") => `${host}:${port}/next-id/${alias}`;
const messageReceivedEvent = "message-received";
const messageSendEvent = "message";
const userAliasUpdateAttemptEvent = "user-alias-update-attempt";
const userAliasUpdateEvent = "user-alias-update";
const delay = 1000;

module.exports = {
  host,
  port,
  socketUrl,
  chatHistoryPath,
  chatHistoryUrl,
  usersIdsAndAliasesUrl,
  firstAvailableUserIdPath,
  getUserIdUrl,
  messageReceivedEvent,
  messageSendEvent,
  delay,
  userAliasUpdateAttemptEvent,
  userAliasUpdateEvent,
  usersIdsAndAliasesPath,
  firstAvailableUserIdPathWithAlias,
};
