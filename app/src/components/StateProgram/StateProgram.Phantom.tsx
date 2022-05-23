// @ts-nocheck
import { useEffect, useState } from 'react';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import initWithPhantom from './init.Phantom.ts';
import connectPhantom from './connectPhantom.ts';
import getBalances from './getBalances.ts';
import updateCounterSettings from './updateCounterSettings.ts';
import createCounterAndIncWithPhantom from './createCounterAndInc.Phantom.ts';
import readSettingsAccount from './readSettingsAccount.ts';
import readCounterAccountWithPhantom from './readCounterAccount.Phantom.ts';
import incCounterWithPhantom from './incCounter.Phantom.ts';
import decCounterWithPhantom from './decCounter.Phantom.ts';
import consoleAllKeys from './consoleAllKeys.ts';

const StateProgramPhantom = () => {
  const [keys, setKeys] = useState(null);
  const [connect, setConnect] = useState(null);
  const [provider, setProvider] = useState(null);
  const [accInfo, setAccInfo] = useState(null);
  const [setInfo, setSetInfo] = useState(null);
  const [incHash, setIncHash] = useState(null);
  const [decHash, setDecHash] = useState(null);
  const [counterHash, setCounterHash] = useState(null);
  const [settingsHash, setSettingsHash] = useState(null);

  useEffect(() => {
    const url = clusterApiUrl('devnet');
    const connection = new Connection(url, 'confirmed');
    connectPhantom().then((data: {}) => setProvider(data));
    setConnect(connection);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    initWithPhantom(connect, provider).then(
      (data: {}) => !keys && setKeys(data)
    );
    // eslint-disable-next-line
  }, [provider, connect]);

  const getCounterInfo = async () =>
    setAccInfo(await readCounterAccountWithPhantom(keys, connect, phantom));

  const getSettingsInfo = async () =>
    setSetInfo(await readSettingsAccount(keys, connect));

  const decrement = async () => {
    const hash = await decCounterWithPhantom(keys, connect);
    setDecHash(`https://explorer.solana.com/tx/${hash}?cluster=devnet`);
  };

  const increment = async () => {
    const hash = await incCounterWithPhantom(keys, connect);
    setIncHash(`https://explorer.solana.com/tx/${hash}?cluster=devnet`);
  };

  const createCounter = async () => {
    const hash = await createCounterAndIncWithPhantom(keys, connect, provider);
    setCounterHash(
      hash.length !== 18
        ? `https://explorer.solana.com/tx/${hash}?cluster=devnet`
        : hash
    );
  };

  const updateSettings = async () => {
    const hash = await updateCounterSettings(
      keys.adminKeypair.publicKey.toBytes(),
      1,
      1,
      keys,
      connect
    );
    setSettingsHash(`https://explorer.solana.com/tx/${hash}?cluster=devnet`);
  };

  return (
    <div style={{ paddingBottom: '40px', fontSize: '14px' }}>
      <div style={{ padding: '20px', backgroundColor: 'pink' }}>
        <p style={{ marginBottom: '10px' }}>{`admin: ${
          keys && keys.adminKeypair.publicKey.toBase58()
        }`}</p>
        <p style={{ marginBottom: '10px' }}>
          {`phantom: ${provider && provider.publicKey.toBase58()}`}
        </p>
        <p style={{ marginBottom: '10px' }}>{`program: ${
          keys && keys.programKeypair.publicKey.toBase58()
        }`}</p>
        <p style={{ marginBottom: '10px' }}>{`counter: ${
          keys && keys.counterPubkey.toBase58()
        }`}</p>
        <p>{`settings: ${keys && keys.settingsPubkey[0].toBase58()}`}</p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => getCounterInfo()}>Get counter</button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>
            {accInfo ? accInfo.counter : 0}
          </span>
          <span>{accInfo ? accInfo.value : 0}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => getSettingsInfo()}>Get settings</button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>
            {setInfo ? setInfo.inc_step : 0}
          </span>
          <span>{setInfo ? setInfo.dec_step : 0}</span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => increment()}>Increment</button>
        </div>
        <div style={{ padding: 40 }}>
          {incHash ? (
            <a
              style={{ textDecoration: 'none', color: 'teal' }}
              href={incHash}
              target='_blank'
              rel='noreferrer'
            >
              {`${incHash.slice(31, 45)}...`}
            </a>
          ) : (
            '-'
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => decrement()}>Decrement</button>
        </div>
        <div style={{ padding: 40 }}>
          {decHash ? (
            <a
              style={{ textDecoration: 'none', color: 'teal' }}
              href={decHash}
              target='_blank'
              rel='noreferrer'
            >
              {`${decHash.slice(31, 45)}...`}
            </a>
          ) : (
            '-'
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => createCounter()}>Create counter</button>
        </div>
        <div style={{ padding: 40 }}>
          {counterHash ? (
            counterHash.length !== 18 ? (
              <a
                style={{ textDecoration: 'none', color: 'teal' }}
                href={counterHash}
                target='_blank'
                rel='noreferrer'
              >
                {`${counterHash.slice(31, 45)}...`}
              </a>
            ) : (
              counterHash
            )
          ) : (
            '-'
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => updateSettings()}>Update settings</button>
        </div>
        <div style={{ padding: 40 }}>
          {settingsHash ? (
            <a
              style={{ textDecoration: 'none', color: 'teal' }}
              href={settingsHash}
              target='_blank'
              rel='noreferrer'
            >
              {`${settingsHash.slice(31, 45)}...`}
            </a>
          ) : (
            '-'
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => consoleAllKeys(keys)}>Show keys</button>
        </div>
        <div style={{ padding: 40 }}>open your console</div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => getBalances(connect, keys, phantom)}>
            Get balances
          </button>
        </div>
        <div style={{ padding: 40 }}>open your console</div>
      </div>
    </div>
  );
};

export default StateProgramPhantom;
