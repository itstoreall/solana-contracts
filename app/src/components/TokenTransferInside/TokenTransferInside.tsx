// @ts-nocheck
import { useState, useEffect } from 'react';
import {
  clusterApiUrl,
  Connection,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import lo from 'buffer-layout';
import BN from 'bn.js';
import init from './init.ts';
import getBalances from './getBalances.ts';

const TokenTransferInside = () => {
  const [connect, setConnect] = useState(null);
  const [token, setToken] = useState(null);
  const [keys, setKeys] = useState(null);
  const [accs, setAccs] = useState(null);
  const [walletBalances, setWalletBalances] = useState(null);
  const [tokenBalances, setTokenBalances] = useState(null);

  const url = clusterApiUrl('devnet');
  const connection = new Connection(url, 'confirmed');

  useEffect(() => {
    init(connection).then((data: {}) => {
      setToken(data.token);
      setKeys(data.keys);
      setAccs(data.accs);
    });
    setConnect(connection);
    // eslint-disable-next-line
  }, []);

  // keys && console.log('keys -->', keys);
  // accs && console.log('accs -->', accs);

  // const getInit = async () => {
  //   console.log('init');

  //   const data = await init(connection);
  //   setToken(data.token);
  //   setKeys(data.keys);
  //   setAccs(data.accs);
  //   setConnect(connection);
  // };

  const getAllBalances = async () => {
    const balances = await getBalances(connect, keys, accs);
    setWalletBalances(balances.wallet);
    setTokenBalances(balances.token);
    console.log('getbalance =>');
  };

  const getAllBalancesLog = async () => {
    const balances = await getBalances(connect, keys, accs);
    console.log('getbalance log =>');
    console.log('adm:', balances.wallet.admin);
    console.log('cap:', balances.wallet.cap);
    console.log('ron:', balances.wallet.ronny);
    console.log('hel:', balances.wallet.helga);
    console.log('adm:', balances.token.admin);
    console.log('cap:', balances.token.cap);
    console.log('ron:', balances.token.ronny);
    console.log('hel:', balances.token.helga);
  };

  const amount = Buffer.alloc(8); // 10 YSSC
  lo.ns64('value').encode(new BN(10), amount);

  const approve = async () => {
    // from cap to ronny
    try {
      const approveIx = new TransactionInstruction({
        programId: keys.programKeypair.publicKey,
        keys: [
          {
            pubkey: keys.capKeypair.publicKey,
            isSigner: true,
            isWritable: true,
          },
          { pubkey: accs.capTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: accs.ronnyTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        data: Buffer.of(1, ...amount),
      });

      const tx = new Transaction().add(approveIx);

      tx.feePayer = keys.capKeypair.publicKey;
      tx.recentBlockhash = await connect.getLatestBlockhash().blockhash;

      const resApprove = await sendAndConfirmTransaction(connect, tx, [
        keys.capKeypair,
      ]);

      console.log('approve tx', resApprove);
    } catch (err) {
      console.log('ERROR in approve:', err.message);
    }
  };

  const transferCapToHelga = async () => {
    console.log('admin to helga =>');

    try {
      const transferIx = new TransactionInstruction({
        programId: keys.programKeypair.publicKey,
        keys: [
          {
            pubkey: keys.capKeypair.publicKey,
            isSigner: true,
            isWritable: false,
          },
          { pubkey: accs.capTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: accs.helgaTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        data: Buffer.of(0, ...amount),
      });

      const tx = new Transaction().add(transferIx);

      tx.feePayer = keys.capKeypair.publicKey;
      tx.recentBlockhash = await connect.getLatestBlockhash().blockhash;

      const transferRes = await sendAndConfirmTransaction(connect, tx, [
        keys.capKeypair,
      ]);

      console.log('transfer tx', transferRes);

      // const updatedBalance = await refreshBalance(network, account);
      // console.log('updatedBalance -->', updatedBalance);
    } catch (err) {
      console.log('ERROR in transfer:', err.message);
    }
  };

  const transferCapToRonny = async () => {
    console.log('transfer to Ronny');

    try {
      // from cap to ronny
      const transferIx = new TransactionInstruction({
        keys: [
          {
            pubkey: keys.capKeypair.publicKey,
            isSigner: true,
            isWritable: false,
          },
          { pubkey: accs.capTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: accs.ronnyTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        programId: keys.programKeypair.publicKey,
        data: Buffer.of(0, ...amount),
      });

      const tx = new Transaction().add(transferIx);

      tx.feePayer = keys.capKeypair.publicKey;
      tx.recentBlockhash = await connect.getLatestBlockhash().blockhash;

      const transferRes = await sendAndConfirmTransaction(connect, tx, [
        keys.capKeypair,
      ]);

      console.log('transfer tx', transferRes);
    } catch (err) {
      console.log('ERROR in transfer:', err.message);
    }
  };

  const transferRonnyToHelga = async () => {
    console.log('transfer Ronny to Helga');

    try {
      // from ronny to helga
      const transferIx = new TransactionInstruction({
        keys: [
          {
            pubkey: keys.ronnyKeypair.publicKey,
            isSigner: true,
            isWritable: false,
          },
          { pubkey: accs.ronnyTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: accs.helgaTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        programId: keys.programKeypair.publicKey,
        data: Buffer.of(0, ...amount),
      });

      const tx = new Transaction().add(transferIx);

      tx.feePayer = keys.ronnyKeypair.publicKey;
      tx.recentBlockhash = await connect.getLatestBlockhash().blockhash;

      const transferRes = await sendAndConfirmTransaction(connect, tx, [
        keys.ronnyKeypair,
      ]);

      console.log('transfer tx', transferRes);
    } catch (err) {
      console.log('ERROR in transfer:', err.message);
    }
  };

  const transferHelgaToRonny = async () => {
    console.log('transfer Ronny to Helga');

    try {
      // from helga to ronny
      const transferIx = new TransactionInstruction({
        keys: [
          {
            pubkey: keys.helgaKeypair.publicKey,
            isSigner: true,
            isWritable: false,
          },
          { pubkey: accs.helgaTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: accs.ronnyTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        programId: keys.programKeypair.publicKey,
        data: Buffer.of(0, ...amount),
      });

      const tx = new Transaction().add(transferIx);

      tx.feePayer = keys.helgaKeypair.publicKey;
      tx.recentBlockhash = await connect.getLatestBlockhash().blockhash;

      const transferRes = await sendAndConfirmTransaction(connect, tx, [
        keys.helgaKeypair,
      ]);

      console.log('transfer tx', transferRes);
    } catch (err) {
      console.log('ERROR in transfer:', err.message);
    }
  };

  const approvedTransfer = async () => {
    console.log('approved transfer');

    try {
      // from helga to ronny
      const transferIx = new TransactionInstruction({
        keys: [
          {
            pubkey: keys.helgaKeypair.publicKey,
            isSigner: true,
            isWritable: false,
          },
          { pubkey: accs.helgaTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: accs.ronnyTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        programId: keys.programKeypair.publicKey,
        data: Buffer.of(0, ...amount),
      });

      const tx = new Transaction().add(transferIx);

      tx.feePayer = keys.helgaKeypair.publicKey;
      tx.recentBlockhash = await connect.getLatestBlockhash().blockhash;

      const transferRes = await sendAndConfirmTransaction(connect, tx, [
        keys.helgaKeypair,
      ]);

      console.log('transfer tx', transferRes);
    } catch (err) {
      console.log('ERROR in transfer:', err.message);
    }
  };

  return (
    <div style={{ paddingBottom: '40px', fontSize: '14px' }}>
      {keys && accs && token && (
        <div style={{ padding: '20px', backgroundColor: 'pink' }}>
          <p
            style={{ marginBottom: '10px' }}
          >{`token mint: ${token.toBase58()}`}</p>
          <p
            style={{ marginBottom: '20px' }}
          >{`prog wall: ${keys.programKeypair.publicKey.toBase58()}`}</p>
          <p style={{ marginBottom: '10px' }}>
            {`admin wall: ${keys.adminKeypair.publicKey.toBase58()}`}
            <span style={{ paddingLeft: '10px', fontWeight: 600 }}>{`bal: ${
              walletBalances ? walletBalances.admin : '-'
            }`}</span>
          </p>
          <p style={{ marginBottom: '10px' }}>
            {`cap wall: ${keys.capKeypair.publicKey.toBase58()}`}
            <span style={{ paddingLeft: '10px', fontWeight: 600 }}>{`bal: ${
              walletBalances ? walletBalances.cap : '-'
            }`}</span>
          </p>
          <p style={{ marginBottom: '10px' }}>
            {`ronny wall: ${keys.ronnyKeypair.publicKey.toBase58()}`}
            <span style={{ paddingLeft: '10px', fontWeight: 600 }}>{`bal: ${
              walletBalances ? walletBalances.ronny : '-'
            }`}</span>
          </p>
          <p style={{ marginBottom: '20px' }}>
            {`hel wall: ${keys.helgaKeypair.publicKey.toBase58()}`}
            <span style={{ paddingLeft: '10px', fontWeight: 600 }}>{`bal: ${
              walletBalances ? walletBalances.helga : '-'
            }`}</span>
          </p>
          <p style={{ marginBottom: '10px' }}>
            {`adm acc: ${accs.adminTokenPubkey.toBase58()}`}
            <span style={{ paddingLeft: '10px', fontWeight: 600 }}>{`bal: ${
              tokenBalances ? tokenBalances.admin : '-'
            }`}</span>
          </p>
          <p style={{ marginBottom: '10px' }}>
            {`cap acc: ${accs.capTokenPubkey.toBase58()}`}
            <span style={{ paddingLeft: '10px', fontWeight: 600 }}>{`bal: ${
              tokenBalances ? tokenBalances.cap : '-'
            }`}</span>
          </p>
          <p style={{ marginBottom: '10px' }}>
            {`ronny acc: ${accs.ronnyTokenPubkey.toBase58()}`}
            <span style={{ paddingLeft: '10px', fontWeight: 600 }}>{`bal: ${
              tokenBalances ? tokenBalances.ronny : '-'
            }`}</span>
          </p>
          <p style={{ marginBottom: '10px' }}>
            {`helga acc: ${accs.helgaTokenPubkey.toBase58()}`}
            <span style={{ paddingLeft: '10px', fontWeight: 600 }}>{`bal: ${
              tokenBalances ? tokenBalances.helga : '-'
            }`}</span>
          </p>
        </div>
      )}

      {/* <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => getInit()}>init</button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>
            {keys && accs && token && 'done'}
          </span>
        </div>
      </div> */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button disabled={!keys && !accs} onClick={() => getAllBalances()}>
            Get Balances
          </button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>
            {walletBalances && tokenBalances && 'done'}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button disabled={!keys && !accs} onClick={() => getAllBalancesLog()}>
            Get Balances (log)
          </button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>open your console</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button disabled onClick={() => approve()}>
            approve
          </button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>{111}</span>
          <span>{222}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button disabled onClick={() => approvedTransfer()}>
            approved transfer
          </button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>{111}</span>
          <span>{222}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => transferCapToHelga()}>
            transfer: Cap to Helga
          </button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>{111}</span>
          <span>{222}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => transferCapToRonny()}>
            transfer: Cap to Ronny
          </button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>{111}</span>
          <span>{222}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => transferRonnyToHelga()}>
            transfer: Ronny to Helga
          </button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>{111}</span>
          <span>{222}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => transferHelgaToRonny()}>
            transfer: Helga to Ronny
          </button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>{111}</span>
          <span>{222}</span>
        </div>
      </div>
    </div>
  );
};

export default TokenTransferInside;
