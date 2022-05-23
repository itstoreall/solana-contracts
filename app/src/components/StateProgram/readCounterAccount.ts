// @ts-nocheck
import { decodeCounter } from './serialization.ts';
import { readCounterAccount as log } from '../../logs/state-program';

const readCounterAccount = async (keys: {}, connection: {}) => {
  const account = await connection.getAccountInfo(keys.counterPubkey);

  if (!account) {
    log.error();
    return;
  }

  const counterInfo = decodeCounter(account.data);

  log.counterInfo(counterInfo, keys);

  return counterInfo;
};

export default readCounterAccount;
