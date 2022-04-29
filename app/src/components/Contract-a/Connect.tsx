// @ts-nocheck
import { useState, useMemo } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const ConnectComponent = () => {
  const [vers, setVers] = useState(null);

  useMemo(() => console.log('Connect in process...'), []);

  const getConnect = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');
      const version = await connection.getVersion();

      setVers(version['solana-core']);
    } catch (error) {
      let errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';

      console.log('ERROR in Connect:', errorMessage);
    }
  };

  vers === null && getConnect();

  useMemo(() => vers && console.log('version --->', vers), [vers]);

  return (
    <div>
      <div>
        <span style={{ display: 'inline-flex', width: '150px' }}>version:</span>
        {vers && (
          <span style={{ display: 'inline-flex', width: '150px' }}>{vers}</span>
        )}
        <button onClick={() => setVers(null)}>again</button>
      </div>
    </div>
  );
};

export default ConnectComponent;
