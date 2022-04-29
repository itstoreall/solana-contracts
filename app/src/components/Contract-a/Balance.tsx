// @ts-nocheck
import { useState, useContext, useMemo } from 'react';
import AContext from './context';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

const BalanceComponent = () => {
  const [theBalance, setTheBalance] = useState(null);
  const [theRecipientBalance, setTheRecipientBalance] = useState(null);

  const { accountID, recipientID } = useContext(AContext);

  useMemo(() => console.log('Balance in process...'), []);

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

      console.log('Balance: address --->', accountID);
      console.log('Balance: balance --->', balance);
      console.log('Balance: recipientID --->', recipientID);
      console.log('Balance: recipientBalance --->', recipientBalance);
    } catch (error) {
      let errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      // setTheBalance('ERR');
      console.log('ERROR in Balance:', errorMessage);
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
