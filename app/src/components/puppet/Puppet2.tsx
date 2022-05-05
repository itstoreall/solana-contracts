// @ts-nocheck
import { useEffect, useState } from 'react';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import {
  web3,
  AnchorProvider,
  // Program,
  // BN,
} from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import idl from './idl.json';
// import actions from './actions.ts';
// import actionConfig from './actionConfig';
// import Markup from './Markup.tsx';

const network = clusterApiUrl('devnet');
const newPuppetAccount = web3.Keypair.generate();
const opts = { preflightCommitment: 'processed' };
const programID = new PublicKey(idl.metadata.address);
const connection = new Connection(network, opts.preflightCommitment);

const Puppet = () => {
  // const [value, setValue] = useState('');
  // const [dataList, setDataList] = useState([]);
  const [input, setInput] = useState('');
  // const [connected, setConnected] = useState(false);

  // console.log('network --->', network);
  // console.log('baseAccount --->', baseAccount);
  // console.log('programID --->', programID);

  const wallet = useWallet();

  const sources = {
    input,
  };

  useEffect(() => {
    window.solana.on('connect', () => setConnected(true));
    return () => window.solana.disconnect();
  }, []);

  const getProvider = () =>
    new AnchorProvider(connection, wallet, opts.preflightCommitment);

  const acting = async action => {
    const provider = getProvider();

    console.log('connection --->', connection);
    console.log('wallet -->', wallet); // *
    console.log('provider -->', provider); // *

    // console.log('newPuppetAccount -->', newPuppetAccount); // *
    // console.log(
    //   'newPuppetAccount.publicKey -->',
    //   newPuppetAccount.publicKey
    // ); // *
    // console.log('provider.wallet -->', provider); // *
  };

  const init = () => {
    acting();
  };

  const update = () => {
    acting();
  };

  return (
    <>
      <div style={{ padding: '50px 100px' }}>
        <button style={{ padding: '10px 40px' }} onClick={init}>
          Init
        </button>
      </div>
      <div style={{ padding: '0px 100px' }}>
        <button style={{ padding: '10px 40px' }} onClick={update}>
          Update
        </button>
      </div>
    </>
  );
};

export default Puppet;
