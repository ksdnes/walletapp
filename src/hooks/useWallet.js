import React, { createContext, useState, useEffect, useCallback } from "react";
import doApiCall, { AXIOS_METHOD } from "./useApi";

// Create the Wallet context
export const WalletContext = createContext();

//  **DESCRIPTION**
//The useWallet hook is responsible for providing the data related to a specific wallet at the context level

// Create the Wallet provider component
export const WalletProvider = ({ children }) => {
  const [walletDetails, setWalletDetails] = useState();

  const fetchWalletDetails = useCallback(
    (walletId) => {
      doApiCall(
        AXIOS_METHOD.GET,
        `/wallet/${walletId}`,
        (responseData) => {
          setWalletDetails(responseData);
        },
        (apiError, error) => {
          console.log("API error:", apiError);
          console.log("Axios error:", error);
        }
      );
    },
    [setWalletDetails, walletDetails]
  );

  // Function to refresh the wallet details

  useEffect(() => {
    fetchWalletDetails(walletDetails?.id);
  }, [walletDetails?.id]);

  return (
    <WalletContext.Provider value={{ walletDetails, fetchWalletDetails }}>
      {children}
    </WalletContext.Provider>
  );
};
