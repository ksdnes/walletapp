import React from "react";
import "./App.css";
import Me from "./screens/me/Me";
import NewWallet from "./screens/newwallet/NewWallet";
import RegModal from "./modals/Reg/RegModal";
import WalletDetails from "./screens/walletdetails/WalletDetails";
import LoginModal from "./modals/LoginModal";
import NewTransaction from "./screens/me/components/NewTransaction";
import Page404 from "./screens/404/404";
import Footer from "./components/Footer";
import AppMenu from "./components/AppMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import Providers from "./Providers";
import { useAuth } from "./hooks/useAuth";
import LandingPage from "./screens/LandingPage";

function ProtectedPage({ children }) {
  const { authToken } = useAuth();
  if (authToken === false) {
    return <Navigate to="/"></Navigate>;
  }

  return children;
}
function App() {
  return (
    <Providers>
      <AppMenu />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedPage>
              <LandingPage />
            </ProtectedPage>
          }
        />
        <Route path="/me" exact element={<Me />} />
        <Route path="/newwallet" exact element={<NewWallet />} />
        <Route path="/register" exact element={<RegModal />} />
        <Route path="/addnewwallet" exact element={<NewWallet />} />
        <Route path="/me/wallet/:id" exact element={<WalletDetails />} />
        <Route path="/login" exact element={<LoginModal />} />
        <Route
          path="/wallet/:id/addnewtransaction"
          exact
          element={<NewTransaction />}
        />
        <Route path="*" exact element={<Page404 />} />
      </Routes>
      <Footer />
    </Providers>
  );
}

export default App;
