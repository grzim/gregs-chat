import { defaultSettings } from "./constants";
import { pipe, whenArgNotEmpty } from "./helpers";

export const prepareMessageFromText = (userId) => (text) => ({
  id: new Date(),
  authorId: userId,
  text,
  time: new Date(),
  isSynched: false,
});

export const generateDomainFuncs = ({
  setIsSettingsPanelOpen,
  setMessageToSend,
  setIsTimeFormat12h,
  setIsKeyShortcutForSentActive,
  isKeyShortcutForSentActive,
  isTimeFormat12h,
  userId,
  usersIdsWithAliases,
  setUserAlias,
  userName = usersIdsWithAliases[userId],
}) => ({
  usersIdsWithAliases,
  openSettings: () => setIsSettingsPanelOpen(true),
  closeSettings: () => setIsSettingsPanelOpen(false),
  sendMessage: whenArgNotEmpty(
    pipe(prepareMessageFromText(userId), setMessageToSend)
  ),
  settingsProps: {
    userName,
    setUserAlias,
    closeSettings: () => setIsSettingsPanelOpen(false),
    changeTimeFormatTo12h: () => setIsTimeFormat12h(true),
    changeTimeFormatTo24h: () => setIsTimeFormat12h(false),
    deactivateSendShortcut: () => setIsKeyShortcutForSentActive(false),
    activateSendShortcut: () => setIsKeyShortcutForSentActive(true),
    resetToDefault: () => {
      setIsTimeFormat12h(defaultSettings.isTimeFormat12h),
        setIsKeyShortcutForSentActive(
          defaultSettings.isKeyShortcutForSentActive
        );
    },
    isKeyShortcutForSentActive,
    isTimeFormat12h,
  },
});
