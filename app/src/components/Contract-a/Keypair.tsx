// @ts-nocheck
import { useState, useMemo } from 'react';
import { Keypair } from '@solana/web3.js';

const KeypairComponent = () => {
  const [theAddress, setTheAddress] = useState(null);
  const [theSecret, setTheSecret] = useState(null);

  useMemo(() => console.log('Keypair in process...'), []);

  const getKeypair = () => {
    try {
      const keypair = Keypair.generate();
      const address = keypair?.publicKey.toString();
      const secret = JSON.stringify(Array.from(keypair.secretKey));

      setTheAddress(address);
      setTheSecret(secret);

      console.log('KeypairComponent: address --->', address);
      console.log('KeypairComponent: secret --->', secret);
    } catch (error) {
      let errorMessage =
        error instanceof Error ? error.message : 'Unknown Error';
      console.log('ERROR in Keypair:', errorMessage);
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
