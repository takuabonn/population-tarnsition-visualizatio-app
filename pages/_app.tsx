import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useContext } from "react";
import { useCheck } from "../hooks/useCheck";

type Check = {
  prefCode: number;
  isCheck: boolean;
  label: string;
  data: number[];
  borderColor: string;
};

type InitialState = {
  checkList: Check[];
};

type Payload = {
  prefCode: number;
  isCheck: boolean;
  label: string;
  data: number[];
  borderColor: string;
};

type ContextType = {
  state: InitialState;
  checkOn: (payload: Payload) => void;
  checkOff: (payload: Payload) => void;
};

const CheckContext = createContext<ContextType | undefined>(undefined);

export const useCheckContext = () => {
  const context = useContext(CheckContext);

  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
};

function MyApp({ Component, pageProps }: AppProps) {
  const { state, checkOn, checkOff } = useCheck();

  return (
    <CheckContext.Provider value={{ state, checkOn, checkOff }}>
      <Component {...pageProps} />
    </CheckContext.Provider>
  );
}

export default MyApp;
