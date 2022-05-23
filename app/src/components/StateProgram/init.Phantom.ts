// @ts-nocheck
import { PublicKey } from '@solana/web3.js';
import createKeypair from './createKeypair.ts';
import abminPrivatKey from './devnet/admin.json';
import programPrivatKey from './devnet/program.json';
import { COUNTER_SEED, SETTINGS_SEED } from './constants';
import { init as log } from '../../logs/state-program';

const adminKeypair = createKeypair(abminPrivatKey);
const programKeypair = createKeypair(programPrivatKey);
let counterPubkey = new PublicKey(0);
let settingsPubkey = new PublicKey(0);

const initPhantom = async (connection: {}, provider: {}) => {
  // const isPhantomInstalled = window.solana && window.solana.isPhantom;

  if (provider) {
    counterPubkey = await PublicKey.createWithSeed(
      provider.publicKey,
      COUNTER_SEED, // "counter"
      programKeypair.publicKey
    );

    settingsPubkey = await PublicKey.findProgramAddress(
      [Buffer.from(SETTINGS_SEED, 'utf-8')], // "settings"
      programKeypair.publicKey
    );

    const AccountInfo = await connection.getAccountInfo(
      programKeypair.publicKey
    );

    !AccountInfo && log.error();

    return {
      adminKeypair,
      provider,
      programKeypair,
      counterPubkey,
      settingsPubkey,
    };
  }
};

export default initPhantom;
