// @ts-nocheck
import { useState, useEffect } from 'react';
import {
  clusterApiUrl,
  Connection,
  // PublicKey,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';
import {
  // createAssociatedTokenAccount,
  // getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
// import {
// Connection,
// Keypair,
// PublicKey,
// sendAndConfirmTransaction,
// Transaction,
// TransactionInstruction
// } from '@solana/web3.js';
import lo from 'buffer-layout';
import BN from 'bn.js';
import init from './init.ts';

const TokenTransferInside = () => {
  const [connect, setConnect] = useState(null);
  const [keys, setKeys] = useState(null);
  const [accs, setAccs] = useState(null);

  useEffect(() => {
    const url = clusterApiUrl('devnet');
    const connection = new Connection(url, 'confirmed');

    init(connection).then((data: {}) => {
      setKeys(data.keys);
      setAccs(data.accs);
    });
    setConnect(connection);
    // eslint-disable-next-line
  }, []);

  // keys && console.log('keys -->', keys);
  // accs && console.log('accs -->', accs);

  const amount = Buffer.alloc(8); // 10 YSSC
  lo.ns64('value').encode(new BN(10), amount);

  // console.log('amount -->', amount);

  const approve = async () => {
    // from alice to bob
    try {
      const approveIx = new TransactionInstruction({
        programId: keys.programKeypair.publicKey,
        keys: [
          {
            pubkey: keys.aliceKeypair.publicKey,
            isSigner: true,
            isWritable: true,
          },
          { pubkey: accs.aliceTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: accs.bobTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        data: Buffer.of(1, ...amount),
      });

      const tx = new Transaction().add(approveIx);

      tx.feePayer = keys.aliceKeypair.publicKey;
      tx.recentBlockhash = await connect.getLatestBlockhash().blockhash;

      const resApprove = await sendAndConfirmTransaction(connect, tx, [
        keys.aliceKeypair,
      ]);

      console.log('approve tx', resApprove);
    } catch (err) {
      console.log('ERROR in approve:', err.message);
    }
  };

  const transferToCarol = async () => {
    try {
      // from alice to carol
      const transferIx = new TransactionInstruction({
        programId: keys.programKeypair.publicKey,
        keys: [
          {
            pubkey: keys.aliceKeypair.publicKey,
            isSigner: true,
            isWritable: false,
          },
          { pubkey: accs.aliceTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: accs.carolTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        data: Buffer.of(0, ...amount),
      });

      const tx = new Transaction().add(transferIx);

      tx.feePayer = keys.aliceKeypair.publicKey;
      tx.recentBlockhash = await connect.getLatestBlockhash().blockhash;

      const transferRes = await sendAndConfirmTransaction(connect, tx, [
        keys.aliceKeypair,
      ]);

      console.log('transfer tx', transferRes);
    } catch (err) {
      console.log('ERROR in transfer:', err.message);
    }
  };

  const transferToBob = async () => {
    try {
      // from bob to carol
      const transferIx = new TransactionInstruction({
        keys: [
          {
            pubkey: keys.aliceKeypair.publicKey,
            isSigner: true,
            isWritable: false,
          },
          { pubkey: accs.aliceTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: accs.bobTokenPubkey, isSigner: false, isWritable: true },
          { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
        ],
        programId: keys.programKeypair.publicKey,
        data: Buffer.of(0, ...amount),
      });

      const tx = new Transaction().add(transferIx);

      tx.feePayer = keys.aliceKeypair.publicKey;
      tx.recentBlockhash = await connect.getLatestBlockhash().blockhash;

      const transferRes = await sendAndConfirmTransaction(connect, tx, [
        keys.aliceKeypair,
      ]);

      console.log('transfer tx', transferRes);
    } catch (err) {
      console.log('ERROR in transfer:', err.message);
    }
  };

  return (
    <div style={{ paddingBottom: '40px', fontSize: '14px' }}>
      <div style={{ padding: '20px', backgroundColor: 'pink' }}>
        <p style={{ marginBottom: '10px' }}>{`admin: ${111}`}</p>
        <p style={{ marginBottom: '10px' }}>{`user: ${222}`}</p>
        <p>{`program: ${333}`}</p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => approve()}>approve</button>
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
          <button onClick={() => transferToCarol()}>transfer to Carol</button>
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
          <button onClick={() => transferToBob()}>transfer to Bob</button>
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
