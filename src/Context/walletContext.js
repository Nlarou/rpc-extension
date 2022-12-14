import { createContext, useReducer } from "react";
import walletReducer from "./walletReducer";
const walletContext = createContext();

export const WalletProvider = ({ children }) => {
  //Initial state
  const initialState = {
    accounts: [],
    provider: null,
    accountSelected: null,
  };
  //Our state and dispatch that will be able to give the current state and dispatch from the reducer
  const [state, dispatch] = useReducer(walletReducer, initialState);

  //This is the provider for our context
  return (
    <walletContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </walletContext.Provider>
  );
};

export default walletContext;
