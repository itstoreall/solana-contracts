// @ts-nocheck
import { useState, useEffect, useContext, useMemo } from 'react';
import AContext from './context';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { transfer as log } from '../../logs/contract-a.js';

const TransferComponent = () => {
  const [trustedPublicKey, setTrustedPublicKey] = useState(null);
  const [theHash, setTheHash] = useState(null);

  const { accountID } = useContext(AContext);
  const lamports = 10000001;

  useMemo(() => log.process(), []);

  // ---
  const getProvider = () => {
    const provider = 'solana' in window && window.solana;

    if (provider.isPhantom) {
      console.log('Phantom provider:', provider.isPhantom);
      return provider;
    }
  };

  const provider = getProvider();

  useEffect(() => {
    if (!provider) return;

    const trustedConnect = async () => {
      try {
        const { publicKey: trustedPublicKey } = await window.solana.connect({
          onlyIfTrusted: true,
        });
        trustedPublicKey && setTrustedPublicKey(trustedPublicKey);
      } catch (error) {
        connectPhantom();
      }
    };

    trustedConnect();

    return () => provider.disconnect();
    // eslint-disable-next-line
  }, []);

  const connectPhantom = async () => {
    try {
      const resp = await window.solana.connect();
      resp.publicKey.toString();
    } catch (err) {
      console.log('ERROR in Phantom connect:', err.message);
    }
  };

  window.solana.on('connect', () => console.log('Phantom connected!'));
  window.solana.on('disconnect', () => console.log('Phantom disconnected!'));

  console.log('isConnected:', window.solana.isConnected);
  console.log('Trusted publicKey:', trustedPublicKey);

  const makeTransfer = async () => {
    try {
      if (!trustedPublicKey) return;

      const url = clusterApiUrl('devnet');
      const connection = url && new Connection(url);
      const recipientPublicKey = new PublicKey(accountID);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: trustedPublicKey,
          toPubkey: recipientPublicKey,
          lamports: lamports,
        })
      );

      transaction.feePayer = trustedPublicKey;

      transaction.recentBlockhash = (
        await connection.getLatestBlockhash()
      ).blockhash;

      const { signature } = await window.solana.signAndSendTransaction(
        transaction
      );

      await connection.confirmTransaction(signature);

      console.log('connection -->', connection);
      console.log('transaction -->', transaction);
      console.log('signature -->', signature);
      console.log('transaction.feePayer -->', transaction.feePayer);
    } catch (err) {
      console.log('ERROR in makeTransfer:', err.message);
    }
  };

  makeTransfer();

  // ---

  return (
    <div>
      <>
        <div>
          <span style={{ display: 'inline-flex', width: '150px' }}>
            transfer hash:
          </span>
          {theHash && (
            <span
              style={{
                display: 'inline-flex',
                width: '150px',
                fontSize: '12px',
              }}
            >
              {`${theHash?.slice(0, 10)}...`}
            </span>
          )}
          <button onClick={() => setTheHash(null)}>again</button>
        </div>
      </>
    </div>
  );
};

export default TransferComponent;

// =============================================

/*
import { useState, useContext, useMemo } from 'react';
import AContext from './context';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { transfer as log } from '../../logs/contract-a.js';

const TransferComponent = () => {
  const [theHash, setTheHash] = useState(null);

  const { accountID, accSecretID, recipientID } = useContext(AContext);
  const lamports = 8800000;

  useMemo(() => log.process(), []);

  const makeTransfer = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');
      const fromPubkey = new PublicKey(accountID);
      const toPubkey = new PublicKey(recipientID);
      const secretKey = Uint8Array.from(JSON.parse(accSecretID as string));

      const instructions = SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports,
      });

      const signers = [
        {
          publicKey: fromPubkey,
          secretKey,
        },
      ];

      const transaction = new Transaction().add(instructions);

      const hash = await sendAndConfirmTransaction(
        connection,
        transaction,
        signers
      );

      setTheHash(hash);

      log.res(accountID, recipientID, lamports);
    } catch (err) {
      let message = err instanceof Error ? err.message : 'Unknown Error';
      log.err(message);
    }
  };

  theHash === null && makeTransfer();

  return (
    <div>
      <>
        <div>
          <span style={{ display: 'inline-flex', width: '150px' }}>
            transfer hash:
          </span>
          {theHash && (
            <span
              style={{
                display: 'inline-flex',
                width: '150px',
                fontSize: '12px',
              }}
            >
              {`${theHash?.slice(0, 10)}...`}
            </span>
          )}
          <button onClick={() => setTheHash(null)}>again</button>
        </div>
      </>
    </div>
  );
};

export default TransferComponent;
*/
