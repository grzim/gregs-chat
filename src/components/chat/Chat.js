import React, { useState } from "react";
import "./style.scss";
import TopBar from "./top-bar/TopBar";
import MessagesScreen from "./messages-screen/MessagesScreen";
import InputPanel from "./input-panel/InputPanel";
import Settings from "./settings/Settings";
import Modal from "../modal/Modal";
import { useSettings } from "../../utils/useSettings";
import { useMessages } from "../../utils/useMessages";
import { generateDomainFuncs } from "../../utils/generateDomainFuncs";
import { useUsers } from "../../utils/useUsers";

function Chat({ socketAPI }) {
  const [userId, usersIdsWithAliases, setUserAlias] = useUsers(socketAPI);
  const [
    [isTimeFormat12h, setIsTimeFormat12h],
    [isKeyShortcutForSentActive, setIsKeyShortcutForSentActive],
  ] = useSettings();
  const [messages, setMessageToSend] = useMessages(userId, socketAPI);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const {
    sendMessage,
    closeSettings,
    openSettings,
    settingsProps,
  } = generateDomainFuncs({
    setIsSettingsPanelOpen,
    setMessageToSend,
    setIsTimeFormat12h,
    setIsKeyShortcutForSentActive,
    isKeyShortcutForSentActive,
    isTimeFormat12h,
    userId,
    usersIdsWithAliases,
    setUserAlias,
  });

  return (
    <div className="chat-container">
      <TopBar openSettings={openSettings} />
      <MessagesScreen
        messages={messages}
        usersIdsWithAliases={usersIdsWithAliases}
        userId={userId}
        isTimeFormat12h={isTimeFormat12h}
      />
      <InputPanel
        sendMessage={sendMessage}
        isKeyShortcutForSentActive={isKeyShortcutForSentActive}
      />
      <Modal isOpen={isSettingsPanelOpen} close={closeSettings}>
        <Settings {...settingsProps} />
      </Modal>
    </div>
  );
}

export default Chat;
