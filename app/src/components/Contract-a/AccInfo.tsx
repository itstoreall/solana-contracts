// @ts-nocheck
import { useState, useContext, useMemo } from 'react';
import AContext from './context';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';

const AccountInfoComponent = () => {
  const [theAccInfo, setTheAccInfo] = useState(null);

  const { programID } = useContext(AContext);

  useMemo(() => console.log('AccInfo in process...'), []);

  const getAccInfo = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');
      const publicKey = new PublicKey(programID);
      const accountInfo = await connection.getAccountInfo(publicKey);

      accountInfo && setTheAccInfo(accountInfo.lamports);

      console.log('AccInfo: programID --->', programID);
      console.log('AccInfo: programInfo --->', accountInfo);
    } catch (error) {
      let errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      console.log('ERROR in AccountInfo:', errorMessage);
    }
  };

  theAccInfo === null && getAccInfo();

  return (
    <div>
      <>
        <div>
          <span style={{ display: 'inline-flex', width: '150px' }}>
            lamports:
          </span>
          {theAccInfo && (
            <span style={{ display: 'inline-flex', width: '150px' }}>
              {theAccInfo}
            </span>
          )}
          <button onClick={() => setTheAccInfo(null)}>again</button>
        </div>
      </>
    </div>
  );
};

export default AccountInfoComponent;
