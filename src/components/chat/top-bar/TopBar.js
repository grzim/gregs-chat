import React from "react";
import "./style.scss";
import { appName } from "../../../utils/constants";

function TopBar({ openSettings }) {
  return (
    <div className="top-bar-container">
      <div className="app-name">{appName}</div>
      <div className="settings" role="button" onClick={openSettings}>
        Settings
      </div>
    </div>
  );
}

export default TopBar;
