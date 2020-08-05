const {
  port,
  chatHistoryPath,
  messageReceivedEvent,
  messageSendEvent,
  firstAvailableUserIdPath,
  delay,
} = require("../config");
const cors = require("cors");
const { firstAvailableUserIdPathWithAlias } = require("../config");
const { usersIdsAndAliasesPath } = require("../config");
const { userAliasUpdateEvent } = require("../config");
const { userAliasUpdateAttemptEvent } = require("../config");
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const usersIdsWithAliases = {};
const messages = [];
const addMetadata = (msg) => ({
  ...msg,
  isSynched: true,
  id: Date.now(),
});

let nextUserId = 1;
app.use(cors());

http.listen(port, () => {
  console.log("listening on " + port);
});

/* REST API */
app.post(firstAvailableUserIdPath, (req, res) => {
  res.send({ id: nextUserId++ });
});
app.post(firstAvailableUserIdPathWithAlias, (req, res) => {
  const alias = req.params.alias;
  const existingUserId = (Object.entries(usersIdsWithAliases).find(
    ([id, userAlias]) => userAlias === alias
  ) || [])[0];
  const id = existingUserId ? existingUserId : nextUserId++;
  res.send({ id });
});
app.get(usersIdsAndAliasesPath, (req, res) => res.send(usersIdsWithAliases));
app.get(chatHistoryPath, (req, res) => res.send(messages));

/* Websockets */
io.on("connection", (socket) => {
  io.emit(userAliasUpdateEvent, usersIdsWithAliases);

  socket.on(messageSendEvent, (msg) => {
    setTimeout(() => {
      const message = addMetadata(msg);
      messages.push(message);
      io.emit(messageReceivedEvent, message);
    }, delay);
  });

  socket.on(userAliasUpdateAttemptEvent, ({ userAlias, userId }) => {
    if (
      !Object.values(usersIdsWithAliases).find((alias) => alias === userAlias)
    ) {
      usersIdsWithAliases[userId] = userAlias;
      io.emit(userAliasUpdateEvent, usersIdsWithAliases);
    }
  });
});
