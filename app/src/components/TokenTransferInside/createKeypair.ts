import { Keypair } from '@solana/web3.js';

const createKeypair = (privatKey: number[]) =>
  Keypair.fromSecretKey(new Uint8Array(privatKey));

export default createKeypair;
