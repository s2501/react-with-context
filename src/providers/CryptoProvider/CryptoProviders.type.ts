
export interface CryptoModel {
    exchangeId: string;
    name: string;
    rank: string;
    percentTotalVolume: string;
    volumeUsd: string;
    tradingPairs: string;
    socket: boolean;
    exchangeUrl: string;
    updated: number;
  }
  
  export interface CryptoDto {
    data: CryptoModel[]
  }
  
  export interface CryptoContextValue {
    loading: boolean;
    error: boolean;
    crypto: CryptoModel[];
    watchlist: Set<string>;
    getCrypto?: () => Promise<void>;
    manageWatchlist?: (exchangeId: string, add: boolean) => void;
  }

  
export interface CryptoContextProviderProps {
    children: React.ReactNode;
  }