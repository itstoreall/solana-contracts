// @ts-nocheck
import { useState, useMemo } from 'react';
import { Keypair } from '@solana/web3.js';
import { keypair as log } from '../../logs/contract-a.js';

const KeypairComponent = () => {
  const [theAddress, setTheAddress] = useState(null);
  const [theSecret, setTheSecret] = useState(null);

  useMemo(() => log.process(), []);

  const getKeypair = () => {
    try {
      const keypair = Keypair.generate();
      const address = keypair?.publicKey.toString();
      const secret = JSON.stringify(Array.from(keypair.secretKey));

      setTheAddress(address);
      setTheSecret(secret);

      log.res(address, secret);
    } catch (err) {
      let message = err instanceof Error ? err.message : 'Unknown Error';
      log.err(message);
      setTheAddress('ERROR');
    }
  };

  theAddress === null && getKeypair();

  return (
    <div>
      <div>
        <span style={{ display: 'inline-flex', width: '150px' }}>address:</span>
        <span>{theAddress}</span>
      </div>

      <div>
        <span style={{ display: 'inline-flex', width: '150px' }}>secret:</span>
        <span>{`${theSecret?.slice(0, 56)} ...`}</span>
      </div>
    </div>
  );
};

export default KeypairComponent;
