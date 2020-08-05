import React from "react";

export const tryToInsertImage = async (url, timeout = 2000) =>
  await new Promise(function (resolve, reject) {
    let timerId;
    const img = new Image();
    img.onerror = img.onabort = function () {
      clearTimeout(timerId);
      resolve(url);
    };
    img.onload = function () {
      clearTimeout(timerId);
      resolve(<img src={url} alt={url} />);
    };
    timerId = setTimeout(function () {
      // reset .src to invalid URL so it stops previous
      // loading, but doesn't trigger new load
      img.src = "//!!!!/test.jpg";
    }, timeout);
    img.src = url;
  });

let key = 0;
export const produceBubbleContent = async (text) => {
  const parsed = text
    .split(" ")
    .map((s) =>
      s.split("?")[0].match(/\.(jpeg|jpg|gif|png)$/) !== null
        ? tryToInsertImage(s)
        : s
    );
  let content = [];
  for await (let t of parsed) {
    content.push(
      <div key={key++}>
        {t}
        <span>&nbsp;</span>
      </div>
    );
  }
  return content;
};
