// @ts-nocheck
import { useState, useMemo } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { connect as log } from '../../logs/contract-a.js';

const ConnectComponent = () => {
  const [vers, setVers] = useState(null);

  useMemo(() => log.process(), []);

  const getConnect = async () => {
    try {
      const url = clusterApiUrl('devnet');
      const connection = new Connection(url, 'confirmed');
      const version = await connection.getVersion();

      setVers(version['solana-core']);
    } catch (err) {
      let message = err instanceof Error ? err.message : 'Unknown Error';
      log.err(message);
      setVers('ERROR');
    }
  };

  vers === null && getConnect();

  useMemo(() => vers && log.res(vers), [vers]);

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
