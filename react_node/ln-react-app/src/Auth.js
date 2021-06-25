import React, { useEffect, useState } from "react";
import Firebase from "./components/Firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [refToken, setRefToken] = useState("");
  const [accessToken, setAccessToken] = useState(""); 

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <>Loading...</>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        accessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};