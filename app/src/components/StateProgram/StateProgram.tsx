// @ts-nocheck
import { useState } from 'react';
// import { readFileSync } from 'fs';
import {
  Connection,
  // PublicKey,
  SystemProgram,
  // SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
  // sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  //   Counter,
  // decodeCounter,
  // decodeSettings,
  // encodeCounter,
  encodeDecIx,
  // encodeIncIx,
  // encodeUpdateSettingsIx,
  // Settings,
} from './serialization.ts';
// import BN from 'bn.js';
import init from './init.ts';
import updateCounterSettings from './updateCounterSettings.ts';
import createCounterAndInc from './createCounterAndInc.ts';
import readSettingsAccount from './readSettingsAccount.ts';
import readCounterAccount from './readCounterAccount.ts';

const StateProgram = () => {
  const [keys, setKeys] = useState(null);

  const counterSeed = 'counter';
  const settingsSeed = 'settings';

  const connection = new Connection(
    'https://api.devnet.solana.com',
    'confirmed'
  );

  init(connection).then((data: {}) => !keys && setKeys(data));

  // const res = keys && connection.getAccountInfo(keys.programKeypair.publicKey);
  // res && res.then(data => console.log('accountInfo 1', data));
  // res && res.then(data => console.log('accountInfo 1', data.owner.toString()));

  // ---

  // keys &&
  //   updateCounterSettings(
  //     keys.adminKeypair.publicKey.toBytes(),
  //     52,
  //     25,
  //     keys,
  //     connection
  //   );

  // keys && createCounterAndInc(keys, connection);

  // keys &&
  //   readCounterAccount(keys, connection).then((info: {}) =>
  //     console.log('counterInfo -->', info)
  //   );

  // keys &&
  //   readSettingsAccount(keys, connection).then((info: {}) =>
  //     console.log('settingsInfo -->', info)
  //   );

  // ---

  const decCounter = async () => {
    const decIx = new TransactionInstruction({
      programId: keys.programKeypair.publicKey,
      keys: [
        {
          pubkey: keys.userKeypair.publicKey,
          isSigner: true,
          isWritable: false,
        },
        { pubkey: keys.counterPubkey, isSigner: false, isWritable: true },
        { pubkey: keys.settingsPubkey[0], isSigner: false, isWritable: false },
      ],
      data: encodeDecIx(),
    });

    const tx = new Transaction().add(decIx);
    const res = await connection.sendTransaction(tx, [keys.userKeypair]);
    console.log('dec counter tx -->', res);
    // await delay(3000);
  };

  // keys && decCounter();

  // keys && console.log('admin --->', keys.adminKeypair.publicKey);
  // keys && console.log('user --->', keys.userKeypair.publicKey.toBase58());
  // keys && console.log('program --->', keys.programKeypair.publicKey.toBase58());
  // keys && console.log('counter --->', keys.counterPubkey.toBase58());
  // keys && console.log('settings --->', keys.settingsPubkey[0].toBase58());;

  return <div>StateProgram</div>;
};

export default StateProgram;
