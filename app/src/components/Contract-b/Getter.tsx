// @ts-nocheck
import { useState, useContext, useMemo } from 'react';
import AContext from './context';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import * as borsh from 'borsh';
import { getter as log } from '../../logs/contract-a.js';

// The state of a greeting account managed by the hello world program
class SecondAccount {
  counter = 0;
  constructor(fields: { counter: number } | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for greeting accounts
const SecondAccountSchema = new Map([
  [SecondAccount, { kind: 'struct', fields: [['counter', 'u32']] }],
]);

const GetterComponent = () => {
  const [theGreeting, setTheGreeting] = useState(null);

  const { newProgramID } = useContext(AContext);

  useMemo(() => log.process(), []);

  const getGreeting = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');
      const secondAccPublickey = new PublicKey(newProgramID);

      const accountInfo = await connection.getAccountInfo(secondAccPublickey);

      if (accountInfo === null) {
        throw new Error('Error: cannot find the greeted account');
      }

      const greeting = borsh.deserialize(
        SecondAccountSchema,
        SecondAccount,
        accountInfo.data
      );

      setTheGreeting(String(greeting.counter));

      log.res(newProgramID, accountInfo, greeting);

      // console.log('newProgramID --->', newProgramID);
      // console.log('accountInfo --->', accountInfo); // {data: Uint8Array(4), executable: false, lamports: 918720, owner: PublicKey, rentEpoch: 302}
      // console.log('greeting --->', greeting); // {counter: 0}
    } catch (error) {
      let errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      console.log(errorMessage);
    }
  };

  theGreeting === null && getGreeting();

  return (
    <div>
      <>
        {theGreeting !== null && (
          <div>
            <span style={{ display: 'inline-flex', width: '150px' }}>
              greeting:
            </span>
            <span style={{ display: 'inline-flex', width: '150px' }}>
              {theGreeting}
            </span>
            <button onClick={() => setTheGreeting(null)}>again</button>
          </div>
        )}
      </>
    </div>
  );
};

export default GetterComponent;
