import React, { useEffect, useState } from "react";
import { aliasKeyLS } from "./constants";
import {
  awaitedFetch,
  getIdFromServer,
  getUsersIdsWithAliases,
  proxyAliases,
} from "./helpers";

export const useUsers = (socketAPI) => {
  const [userId, setUserId] = useState(null);
  const [userAlias, setUserAlias] = useState(
    localStorage.getItem(aliasKeyLS) || ""
  );
  const [usersIdsWithAliasesRaw, setUsersIdsWithAliases] = useState({});
  const usersIdsWithAliases = proxyAliases(usersIdsWithAliasesRaw);

  useEffect(() => {
    (async () => {
      setUserId(await getIdFromServer(userAlias));
      setUsersIdsWithAliases(await awaitedFetch(getUsersIdsWithAliases));
      socketAPI.onUserAliasUpdate((usersWithAliases) => {
        setUsersIdsWithAliases(usersWithAliases);
      });
    })();
  }, []);

  useEffect(() => {
    if (userAlias) localStorage.setItem(aliasKeyLS, userAlias);
  }, [usersIdsWithAliasesRaw]);

  useEffect(() => {
    if (userId && userAlias && userAlias !== usersIdsWithAliasesRaw[userId]) {
      socketAPI.userAliasUpdate({ userId, userAlias });
      localStorage.setItem(aliasKeyLS, userAlias);
    }
  }, [userAlias]);

  return [userId, usersIdsWithAliases, setUserAlias];
};
