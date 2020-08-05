import React, { useState } from "react";
import "./style.scss";
import { getRadio } from "../../../utils/getRadio";
import { debounce } from "../../../utils/helpers";
import { debounceTime } from "../../../utils/constants";

function Settings({
  isTimeFormat12h,
  isKeyShortcutForSentActive,
  changeTimeFormatTo12h,
  changeTimeFormatTo24h,
  activateSendShortcut,
  deactivateSendShortcut,
  resetToDefault,
  userName,
  setUserAlias,
}) {
  const [name, setName] = useState(userName);
  const setAliasAfterTime = debounce(
    (name) => setUserAlias(name),
    debounceTime
  );
  return (
    <div className="settings-container">
      <div className="description">Users name</div>
      <input
        type="text"
        className="alias-input"
        value={name}
        onChange={({ target: { value: name } }) => {
          setName(name);
          setAliasAfterTime(name);
        }}
      />
      <div className="description">Clock display</div>
      <div className="form-holder">
        <form>
          {getRadio("12 hours", true, isTimeFormat12h, changeTimeFormatTo12h)}
          {getRadio("24 hours", false, !isTimeFormat12h, changeTimeFormatTo24h)}
        </form>
      </div>
      <div className="description">Send messages on Ctrl/Cmd+Enter</div>
      <div className="form-holder">
        <form>
          {getRadio(
            "On",
            true,
            isKeyShortcutForSentActive,
            activateSendShortcut
          )}
          {getRadio(
            "Off",
            false,
            !isKeyShortcutForSentActive,
            deactivateSendShortcut
          )}
        </form>
      </div>
      <div className="reset-to-default" role="button" onClick={resetToDefault}>
        Reset to default
      </div>
    </div>
  );
}

export default Settings;
