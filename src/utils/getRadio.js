import React from "react";

export const getRadio = (text, value, checked, onChange) => (
  <label>
    <input type="radio" value={value} checked={checked} onChange={onChange} />
    {text}
  </label>
);
