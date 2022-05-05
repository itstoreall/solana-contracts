import { useEffect, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';

// --- Contracts: ---
// import Puppet from './components/puppet';
// import ContractA from './components/Contract-a';
import ContractB from './components/Contract-b';
// ------------------

const { log } = console;

const App = () => {
  return (
    <Context>
      <Content />
    </Context>
  );
};

const Context = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet; // Testnet, Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  // console.log('wallets --->', wallets);

  useEffect(() => log('app:', wallets[0].name, endpoint), [endpoint, wallets]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content = () => {
  return (
    <>
      {/* <Puppet /> */}
      {/* <ContractA /> */}
      <ContractB />
    </>
  );
};

export default App;

/*
const wallets = useMemo(
  () => [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network }),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
    new SolletWalletAdapter({ network }),
    new SolletExtensionWalletAdapter({ network }),
  ],
  [network]
);
*/
