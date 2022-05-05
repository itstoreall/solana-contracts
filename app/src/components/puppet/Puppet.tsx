// @ts-nocheck
import { useEffect } from 'react';
import * as anchor from '@project-serum/anchor';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
// import { useWallet } from '@solana/wallet-adapter-react';
import idl from './idl.json';
import idl2 from './idl2.json';

const opts = { preflightCommitment: 'recent' };

const { SystemProgram } = anchor.web3;
const programID = new anchor.web3.PublicKey(idl.metadata.address);

const Puppet = () => {
  useEffect(() => {
    window.solana.on('connect', () => {
      console.log('updated...');
    });
    return () => {
      window.solana.disconnect();
    };
  }, []);

  const acting = async () => {
    const wallet = window.solana;
    const network = clusterApiUrl('devnet');
    const connection = new Connection(network, opts.preflightCommitment);

    const getProvider = () =>
      new anchor.AnchorProvider(connection, wallet, opts.preflightCommitment);
    const provider = getProvider();

    const puppet = new anchor.Program(idl, programID, provider);
    const puppetMaster = new anchor.Program(idl2, programID, provider);

    const newPuppetAccount = anchor.web3.Keypair.generate();

    try {
      const resp = await window.solana.connect();
      resp.publicKey.toString();
      console.log('init (Phantom) ->', resp.publicKey.toString()); // k31vP9iEyj6z6VhzKkebyM73a4LqNEb3FLU6fTTiDo3
    } catch (err) {
      console.log('ERROR in acting -> resp', err.message);
    }

    await puppet.rpc.initialize({
      accounts: {
        puppet: newPuppetAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [newPuppetAccount],
    });

    const puppetAccount = await puppet.account.data.fetch(
      newPuppetAccount.publicKey
    );

    console.log('puppetAccount --->', puppetAccount.data.toString());

    await puppetMaster.rpc.pullStrings(new anchor.BN(111), {
      accounts: {
        puppet: newPuppetAccount.publicKey,
        puppetProgram: puppet._programId,
      },
    });

    const puppetAccount2 = await puppet.account.data.fetch(
      newPuppetAccount.publicKey
    );

    console.log('puppetAccount2 --->', puppetAccount2.data.toString());
  };

  // ---

  // console.log('puppet -->', puppet); // +
  // console.log('puppetMaster -->', puppetMaster); // +
  // console.log('newPuppetAccount -->', newPuppetAccount); // +
  // console.log('puppet.rpc -->', puppet.rpc); // +
  // console.log('provider.wallet.publicKey --->', provider.wallet.publicKey); // +
  // console.log('SystemProgram.programId --->', SystemProgram.programId); // PublicKey { _bn: <BN: 0> } ---> 11111111111111111111111111111111
  // console.log('puppetMaster.rpc --->', puppetMaster.rpc); // ---> { pullStrings: [AsyncFunction: rpc] }

  // ---

  const acting2 = async () => {
    console.log('Empty');
  };

  const init = () => {
    acting();
  };

  const update = () => {
    acting2();
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
