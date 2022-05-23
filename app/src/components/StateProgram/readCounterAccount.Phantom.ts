// @ts-nocheck
import { decodeCounter } from './serialization.ts';
import { readCounterAccount as log } from '../../logs/state-program';

const readCounterAccountWithPhantom = async (keys: {}, connection: {}) => {
  // const isPhantom = window.solana && window.solana.isPhantom;

  const account = await connection.getAccountInfo(keys.counterPubkey);

  if (!account) {
    log.error();
    return 'counter account is not found';
  }

  const counterInfo = decodeCounter(account.data);

  log.counterInfo(counterInfo, keys);

  return counterInfo;
};

export default readCounterAccountWithPhantom;
