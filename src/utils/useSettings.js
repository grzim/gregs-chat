import React, { useEffect, useState } from "react";
import { defaultSettings, settingsKeyLS } from "./constants";

export const useSettings = () => {
  const [isTimeFormat12h, setIsTimeFormat12h] = useState(
    defaultSettings.isTimeFormat12h
  );
  const [isKeyShortcutForSentActive, setIsKeyShortcutForSentActive] = useState(
    defaultSettings.isKeyShortcutForSentActive
  );

  useEffect(() => {
    const settings = {
      ...defaultSettings,
      ...JSON.parse(localStorage.getItem(settingsKeyLS)),
    };
    setIsTimeFormat12h(settings.isTimeFormat12h);
    setIsKeyShortcutForSentActive(settings.isKeyShortcutForSentActive);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      settingsKeyLS,
      JSON.stringify({ isKeyShortcutForSentActive, isTimeFormat12h })
    );
  }, [isTimeFormat12h, isKeyShortcutForSentActive]);

  return [
    [isTimeFormat12h, setIsTimeFormat12h],
    [isKeyShortcutForSentActive, setIsKeyShortcutForSentActive],
  ];
};
