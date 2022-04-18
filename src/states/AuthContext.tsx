import React, { useContext, createContext, useState, useEffect } from "react";


export interface AuthContextInterface {
  token: string,
  setAuthToken: (token: string) => void,
}

export const AuthContext = createContext<AuthContextInterface>({token: '', setAuthToken: () => null});

export const AuthProvider = (props:any) => 
{
  const [token, setToken] = useState<string>('');

  const setAuthToken = (token: string) => setToken(token);
  return <AuthContext.Provider value={{token, setAuthToken}}>{props.children}</AuthContext.Provider>
};

