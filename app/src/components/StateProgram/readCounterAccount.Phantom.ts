// @ts-nocheck
import { decodeCounter } from './serialization.ts';

const readCounterAccountWithPhantom = async (keys: {}, connection: {}) => {
  // const isPhantom = window.solana && window.solana.isPhantom;

  const account = await connection.getAccountInfo(keys.counterPubkey);

  // console.log('keys.counterPubkey', keys.counterPubkey.toBase58());
  // console.log('provider', provider);
  // console.log('account', account);

  if (!account) {
    console.error('ERROR in readCounterAccount: counter account is not found');
    return 'counter account is not found';
  }

  const counterInfo = decodeCounter(account.data);

  console.log(
    'counterInfo:',
    counterInfo,
    `${keys.counterPubkey.toString().slice(0, 15)}...`
  );

  return counterInfo;
};

export default readCounterAccountWithPhantom;
