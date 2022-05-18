// @ts-nocheck
import { decodeSettings } from './serialization.ts';

const readSettingsAccount = async (keys: {}, connection: {}) => {
  const account = await connection.getAccountInfo(keys.settingsPubkey[0]);

  if (!account) {
    console.error(
      'ERROR in readSettingsAccount: settings account is not found'
    );
    return;
  }

  return decodeSettings(account.data);
};

export default readSettingsAccount;
