import { FC, createContext, useState } from "react";
import axios from 'axios';
import { apiUrl, config } from "../../utils/consts";
import { CryptoContextProviderProps, CryptoContextValue, CryptoDto } from "./CryptoProviders.type";

const initialState: CryptoContextValue = {
  loading: false,
  error: false,
  crypto: [], 
  watchlist: new Set(), 
};

export const CryptoContext = createContext<CryptoContextValue>(initialState);

export const CryptoContextProvider:FC<CryptoContextProviderProps> = ({children}) => {
  const [state, setState] = useState<CryptoContextValue>(initialState);

  const manageWatchlist = (exchangeId: string, add: boolean) => {
    const watchlist = state.watchlist;
    if (add) {
      watchlist.add(exchangeId);
    } else {
      watchlist.delete(exchangeId);
    }

    setState({
      ...state,
      watchlist,
    });
  }

  const getCrypto = async () => {
    setState({...state, loading: true});

    try {
      const { data } = await axios.get<CryptoDto>(
        apiUrl,
        config,
      );
      setState({
        ...state,
        loading: false,
        error: false,
        crypto: data.data
      });
    } catch (error) {
      setState({
        ...initialState,
        error: true,
      })
    }
  }
 
  return (<CryptoContext.Provider value={{...state, getCrypto, manageWatchlist}}>{children}</CryptoContext.Provider>);
}