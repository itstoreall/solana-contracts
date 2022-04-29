// @ts-nocheck
import { useState, useContext, useMemo } from 'react';
import AContext from './context';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { setter as log } from '../../logs/contract-a.js';

const SetterComponent = () => {
  const [theSetter, setTheSetter] = useState(null);

  const { newProgramID, accSecretID, programID } = useContext(AContext);

  useMemo(() => log.process(), []);

  const sendGreeting = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');

      const greeterPublicKey = new PublicKey(newProgramID);
      const programKey = new PublicKey(programID);

      const payerSecretKey = new Uint8Array(JSON.parse(accSecretID));
      const payerKeypair = Keypair.fromSecretKey(payerSecretKey);

      const instruction = new TransactionInstruction({
        keys: [{ pubkey: greeterPublicKey, isSigner: false, isWritable: true }],
        programId: programKey,
        data: Buffer.alloc(0), // All instructions are hellos
      });

      const hash = await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [payerKeypair]
      );

      setTheSetter(hash);

      log.res(programID, newProgramID, hash);
    } catch (err) {
      console.error(err);
      log.err(err.message);
    }
  };

  theSetter === null && sendGreeting();

  return (
    <div>
      <>
        {theSetter !== null && (
          <div>
            <span style={{ display: 'inline-flex', width: '150px' }}>
              setter:
            </span>
            <span
              style={{
                display: 'inline-flex',
                width: '150px',
                fontSize: '12px',
              }}
            >
              {`${theSetter?.slice(0, 10)} ...`}
            </span>
            <button onClick={() => setTheSetter(null)}>again</button>
          </div>
        )}
      </>
    </div>
  );
};

export default SetterComponent;
