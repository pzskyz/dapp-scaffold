import { HashRouter, Route, Switch } from "react-router-dom";
import React, { useMemo } from "react";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { ConnectionProvider } from "./contexts/connection";
import { AccountsProvider } from "./contexts/accounts";
import { MarketProvider } from "./contexts/market";
import { AppLayout } from "./components/Layout";

import { FaucetView, HomeView } from "./views";
import {
  getLedgerWallet,
  getMathWallet,
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolongWallet,
} from "@solana/wallet-adapter-wallets";

export function Routes() {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getLedgerWallet(),
      getSolongWallet(),
      getMathWallet(),
      getSolletWallet(),
    ],
    []
  );

  return (
    <HashRouter basename={"/"}>
      <ConnectionProvider>
        <WalletProvider wallets={wallets} autoConnect>
          <AccountsProvider>
            <MarketProvider>
              <AppLayout>
                <Switch>
                  <Route exact path="/" component={() => <HomeView />} />
                  <Route exact path="/faucet" children={<FaucetView />} />
                </Switch>
              </AppLayout>
            </MarketProvider>
          </AccountsProvider>
        </WalletProvider>
      </ConnectionProvider>
    </HashRouter>
  );
}
