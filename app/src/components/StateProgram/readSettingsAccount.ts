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

  const res = decodeSettings(account.data);

  console.log('settingsInfo -->', res);

  return res;
};

export default readSettingsAccount;
