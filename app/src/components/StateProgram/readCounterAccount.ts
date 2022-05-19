// @ts-nocheck
import { decodeCounter } from './serialization.ts';

const readCounterAccount = async (keys: {}, connection: {}) => {
  const account = await connection.getAccountInfo(keys.counterPubkey);

  if (!account) {
    console.error('ERROR in readCounterAccount: counter account is not found');
    return;
  }

  const res = decodeCounter(account.data);

  console.log('counterInfo -->', res);

  return res;
};

export default readCounterAccount;
