import { useContext, createContext} from "react";


export interface CriticalContextInterface {
  page: string | undefined,
  setCriticalpage: (page: string) => void,
}

export const CriticalContext = createContext<CriticalContextInterface>({page: '', setCriticalpage: () => console.warn("NO page provider")});
export const useCritical = () => useContext(CriticalContext);