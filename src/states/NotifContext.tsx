import React, { useContext, createContext, useState, useEffect } from "react";

export interface NotifInterface {
  id: number,
  message: string,
  type?: "OK" | "INFO" | "ERROR",
  code?: number,
}

export interface NotifContextInterface {
  notif: NotifInterface | null,
  setNotification: (notif: NotifInterface | null) => void,
}


export const NotifContext = createContext<NotifContextInterface | null>(null);

export const NotifProvider = (props:any) => 
{
  const [notif, setNotif] = useState<NotifInterface | null>(
    {id:1 , message: "Server Error", type: "ERROR", code: 500});
  
    // Disapear after 3 seconds
  useEffect(() => {
    if (notif != null)  setTimeout(() => { setNotif(null) }, 4000);
  },[notif])

  const setNotification = (notif: NotifInterface | null) => setNotif(notif);
  return <NotifContext.Provider value={{notif, setNotification}}>{props.children}</NotifContext.Provider>
};

