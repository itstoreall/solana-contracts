// @ts-nocheck
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

const TransferComponent = () => {
  const [theHash, setTheHash] = useState(null);

  const { accountID, accSecretID, recipientID } = useContext(AContext);
  const lamports = 8800000;

  useMemo(() => console.log('Transfer in process...'), []);

  const makeTransfer = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');
      const fromPubkey = new PublicKey(accountID);
      const toPubkey = new PublicKey(recipientID);
      console.log('1');
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

      console.log('Trans: accountID --->', accountID);
      console.log('Trans: accSecretID --->', accSecretID);
      console.log('Trans: recipientID --->', recipientID);
      console.log('Trans: lamports --->', lamports);
      console.log(
        'Trans: signers --->',
        JSON.stringify(Array.from(signers[0].secretKey))
      );
    } catch (error) {
      let errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      console.log('ERROR in Transfer:', errorMessage);
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
