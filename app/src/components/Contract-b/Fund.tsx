// @ts-nocheck
import { useState, useContext, useMemo } from 'react';
import AContext from './context';
import {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { fund as log } from '../../logs/contract-a.js';

const FundComponent = () => {
  const [theAmount, setTheAmount] = useState(null);

  const { accountID } = useContext(AContext);

  useMemo(() => log.process(), []);

  const getFund = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');
      const publicKey = new PublicKey(accountID);
      const amount = LAMPORTS_PER_SOL * 2;
      const hash = await connection.requestAirdrop(publicKey, amount);
      await connection.confirmTransaction(hash);

      setTheAmount(amount);

      log.res(accountID, hash);
    } catch (err) {
      let message = err instanceof Error ? err.message : 'Unknown Error';
      log.err(message);
      setTheAmount('ERROR');
    }
  };

  theAmount === null && getFund();

  return (
    <div>
      <>
        <div>
          <span style={{ display: 'inline-flex', width: '150px' }}>
            funded:
          </span>
          {theAmount !== null && (
            <span style={{ display: 'inline-flex', width: '150px' }}>
              {theAmount}
            </span>
          )}
          <button onClick={() => setTheAmount(null)}>again</button>
        </div>
      </>
    </div>
  );
};

export default FundComponent;
