// @ts-nocheck
import { useState, useContext, useMemo } from 'react';
import AContext from './context';
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

const FundComponent = () => {
  const [theHash, setTheHash] = useState(null);
  const [theAmount, setTheAmount] = useState(null);

  const { accountID } = useContext(AContext);

  useMemo(() => console.log('Fund in process...'), []);

  const getFund = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');
      const publicKey = new PublicKey(accountID);
      const amount = LAMPORTS_PER_SOL * 2;
      const hash = await connection.requestAirdrop(publicKey, amount);
      await connection.confirmTransaction(hash);

      setTheHash(hash);
      setTheAmount(amount);

      console.log('Fund: accountID --->', accountID);
      console.log('Fund: hash --->', hash);
    } catch (error) {
      let errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      console.log('ERROR in Fund:', errorMessage);
    }
  };

  theHash === null && getFund();

  return (
    <div>
      <>
        <div>
          <span style={{ display: 'inline-flex', width: '150px' }}>
            funded:
          </span>
          {theHash !== null && (
            <span style={{ display: 'inline-flex', width: '150px' }}>
              {theAmount}
            </span>
          )}
          <button onClick={() => setTheHash(null)}>again</button>
        </div>
      </>
    </div>
  );
};

export default FundComponent;
