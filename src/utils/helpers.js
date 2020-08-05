import React from "react";
import { fetchError, messageAuthorZeroPad } from "./constants";
import {
  chatHistoryUrl,
  getUserIdUrl,
  usersIdsAndAliasesUrl,
} from "../../config";

export const pipe = (...functions) => (initialValue) =>
  functions.reduce((acc, f) => f(acc), initialValue);

export const getEventValue = (e) => e.target.value;
export const preventDefault = (e) => (e.preventDefault(), e);
export const identity = (x) => x;
export const zeroPad = (num, places) => String(num).padStart(places, "0");
export const exists = (x) => ![undefined, null].includes(x);
export const whenArgNotEmpty = (f) => (x) => x && f(x);
export const isNotEmpty = (obj) => Object.values(obj).length > 0;

export const parseTime = (isTimeFormat12h, time) =>
  new Date(time).toLocaleString("eu", {
    hour: "numeric",
    minute: "numeric",
    hour12: isTimeFormat12h,
  });

export const awaitedFetch = async (fetcher, ...props) => {
  try {
    const response = await fetcher(...props);
    return await response.json();
  } catch (e) {
    console.error("fetch unsuccessful");
    return fetchError;
  }
};

export const getAuthor = (authorId, usersIdsWithAliases) => {
  const alias = usersIdsWithAliases[authorId];
  return String(alias) !== String(authorId)
    ? alias
    : "Guest " + zeroPad(authorId, messageAuthorZeroPad);
};

export const handleMessageSend = (
  messages,
  messageToSend,
  authorId,
  effect
) => {
  const messageToAdd = {
    ...messageToSend,
    stamp: Date.now(),
    isSynched: false,
    authorId,
  };
  effect(messageToAdd);
  return [...messages, messageToAdd];
};

export const scrollToBottom = (element) => {
  setTimeout(() => {
    element.scrollIntoView &&
      element.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
  }, 0);
};

export const debounce = (() => {
  let timeoutId;
  return (func, time) => {
    return (...args) => {
      const f = () => {
        timeoutId = null;
        func(...args);
      };
      clearTimeout(timeoutId);
      timeoutId = setTimeout(f, time);
    };
  };
})();

export const proxyAliases = (aliasesObj) =>
  new Proxy(aliasesObj, {
    get(target, prop) {
      return target[prop] || prop;
    },
  });

export const getIdFromServer = async (alias) =>
  (await awaitedFetch(getUserIdForAlias, alias)).id;

export const getUsersIdsWithAliases = async () =>
  await fetch(usersIdsAndAliasesUrl);
export const getHistory = async () => await fetch(chatHistoryUrl);
export const getUserIdForAlias = async (alias) =>
  await fetch(getUserIdUrl(alias), {
    method: "POST",
  });
