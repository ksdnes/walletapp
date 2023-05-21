import { useCallback, useContext, useState } from "react";
import React from "react";
import { setApiToken } from "./useApi";

const AuthContext = React.createContext();
AuthContext.displayName = "AutContext";

//  **DESCRIPTION**
//The useAuth hook allows me to handle user authentication and manage the logged-in state at the context level.

export function AuthContextProvider({ children }) {
  const [autToken, setAutToken] = useState(false);
  const [sessionUser, setSessionUser] = useState({});

  const handleLoginResult = useCallback(
    (loginResult) => {
      setAutToken(loginResult.token);
      setApiToken(loginResult.token);
      setSessionUser(loginResult.user);
    },
    [setAutToken, setSessionUser]
  );

  const logOut = useCallback(() => {
    handleLoginResult({ token: false, user: {} });
  }, [handleLoginResult]);

  return (
    <AuthContext.Provider
      value={{
        autToken,
        sessionUser,
        handleLoginResult,
        logOut,
        setSessionUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
