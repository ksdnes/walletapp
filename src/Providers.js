import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./hooks/useAuth";
import { ModalContextProvider } from "./hooks/useModal";
import { WalletProvider } from "./hooks/useWallet";

export default function Providers({ children }) {
  return (
    <AuthContextProvider>
      <WalletProvider>
        <BrowserRouter>
          <ModalContextProvider>{children}</ModalContextProvider>
        </BrowserRouter>
      </WalletProvider>
    </AuthContextProvider>
  );
}
