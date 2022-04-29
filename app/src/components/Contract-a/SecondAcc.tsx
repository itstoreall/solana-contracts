// @ts-nocheck
import { useState, useContext, useMemo } from 'react';
import AContext from './context';
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import * as borsh from 'borsh';
import { secondAcc as log } from '../../logs/contract-a.js';

// The state of a greeting account managed by the hello world program
class SecondAccount {
  counter = 0;
  constructor(fields: { counter: number } | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

const SecondAccountSchema = new Map([
  [SecondAccount, { kind: 'struct', fields: [['counter', 'u32']] }],
]);

// The expected size of each greeting account.
const ACCOUNT_SIZE = borsh.serialize(
  SecondAccountSchema,
  new SecondAccount()
).length;

const SecondAccComponent = () => {
  const [theSecondAcc, setTheSecondAcc] = useState(null);

  const { programID, accSecretID } = useContext(AContext);

  useMemo(() => log.process(), []);

  const createSecondAcc = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');

      const programId = new PublicKey(programID);
      const payer = Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(accSecretID))
      );

      const ACCOUNT_SEED = 'Hello! ...';

      const secondAccPubkey = await PublicKey.createWithSeed(
        payer.publicKey,
        ACCOUNT_SEED,
        programId
      );

      const lamports = await connection.getMinimumBalanceForRentExemption(
        ACCOUNT_SIZE
      );

      const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: payer.publicKey,
          basePubkey: payer.publicKey,
          seed: ACCOUNT_SEED,
          newAccountPubkey: secondAccPubkey,
          lamports,
          space: ACCOUNT_SIZE,
          programId,
        })
      );

      const hash = await sendAndConfirmTransaction(connection, transaction, [
        payer,
      ]);

      setTheSecondAcc(hash);

      console.log('SecondAcc: programID --->', programID);
      console.log('SecondAcc: ACCOUNT_SIZE --->', ACCOUNT_SIZE);
      console.log('SecondAcc: accSecretID --->', accSecretID);
      console.log('SecondAcc: programId --->', programId);
      console.log('SecondAcc: payer --->', payer);
      console.log('SecondAcc: secondAccPubkey --->', secondAccPubkey);
      console.log('SecondAcc: lamports --->', lamports);
      console.log('SecondAcc: transaction --->', transaction);
      console.log('SecondAcc: hash --->', hash);
    } catch (err) {
      let message = err instanceof Error ? err.message : 'Unknown Error';
      log.err(message);
    }
  };

  theSecondAcc === null && createSecondAcc();

  return (
    <div>
      <>
        {theSecondAcc !== null && (
          <div>
            <span style={{ display: 'inline-flex', width: '150px' }}>
              second acc hash:
            </span>
            <span
              style={{
                display: 'inline-flex',
                width: '150px',
                fontSize: '12px',
              }}
            >
              {`${theSecondAcc?.slice(0, 10)}...`}
            </span>
          </div>
        )}
      </>
    </div>
  );
};

export default SecondAccComponent;
