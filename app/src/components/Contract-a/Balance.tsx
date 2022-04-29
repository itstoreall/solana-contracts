// @ts-nocheck
import { useState, useContext, useMemo } from 'react';
import AContext from './context';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { balance as log } from '../../logs/contract-a.js';

const BalanceComponent = () => {
  const [theBalance, setTheBalance] = useState(null);
  const [theRecipientBalance, setTheRecipientBalance] = useState(null);

  const { accountID, recipientID } = useContext(AContext);

  useMemo(() => log.process, []);

  const getBalance = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');
      const publicKey = new PublicKey(accountID);
      const balance = await connection.getBalance(publicKey);

      const recipientPublicKey = new PublicKey(recipientID);
      const recipientBalance = await connection.getBalance(recipientPublicKey);

      if (balance === 0 || balance === undefined) {
        throw new Error('Account not funded');
      }

      setTheBalance(balance);
      setTheRecipientBalance(recipientBalance);

      log.res(accountID, balance, recipientID, recipientBalance);
    } catch (err) {
      let message = err instanceof Error ? err.message : 'Unknown Error';
      log.err(message);
      setTheBalance('ERROR');
    }
  };

  theBalance === null && getBalance();

  return (
    <div>
      <>
        <div style={{ display: 'flex', width: '400px' }}>
          <div>
            <span style={{ display: 'inline-flex', width: '150px' }}>
              balance:
            </span>
            <span style={{ display: 'inline-flex', width: '150px' }}>
              {theBalance}
            </span>
          </div>
          <div>
            <span style={{ display: 'inline-flex', width: '150px' }}>
              recipient balance:
            </span>
            <span style={{ display: 'inline-flex', width: '150px' }}>
              {theRecipientBalance}
            </span>
          </div>
          <button onClick={() => setTheBalance(null)}>again</button>
        </div>
      </>
    </div>
  );
};

export default BalanceComponent;
