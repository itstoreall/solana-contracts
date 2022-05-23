// @ts-nocheck
import { decodeSettings } from './serialization.ts';
import { readSettings as log } from '../../logs/state-program';

const readSettingsAccount = async (keys: {}, connection: {}) => {
  const account = await connection.getAccountInfo(keys.settingsPubkey[0]);

  if (!account) {
    log.error();
    return;
  }

  const settingsInfo = decodeSettings(account.data);

  log.settingsInfo(settingsInfo, keys);

  return settingsInfo;
};

export default readSettingsAccount;
