import React, { useContext, createContext, useState, useEffect } from "react";


export interface AuthContextInterface {
  token: string | undefined,
  setAuthToken: (token: string) => void,
}

export const AuthContext = createContext<AuthContextInterface>({token: '', setAuthToken: () => console.warn("NO Auth provider")});
export const useAuth = () => useContext(AuthContext);

