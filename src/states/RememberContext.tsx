import React, { useContext, createContext, useState, useEffect } from "react";


export interface RemContextInterface {
  rem: boolean | undefined,
  setRem: (rem: boolean) => void,
}

export const RemContext = createContext<RemContextInterface>({rem: false, setRem: () => console.warn("NO Auth provider")});
export const useRem = () => useContext(RemContext);

