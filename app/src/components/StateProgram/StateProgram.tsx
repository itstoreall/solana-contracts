// @ts-nocheck
import { useEffect, useState, useMemo } from 'react';
import { clusterApiUrl, Connection } from '@solana/web3.js';
// import init from './init.ts';
import initWithPhantom from './init.Phantom.ts';
import connectPhantom from './connectPhantom.ts';
import getBalances from './getBalances.ts';
import updateCounterSettings from './updateCounterSettings.ts';
import createCounterAndInc from './createCounterAndInc.ts';
import readSettingsAccount from './readSettingsAccount.ts';
import readCounterAccount from './readCounterAccount.ts';
import decCounter from './decCounter.ts';
import incCounter from './incCounter.ts';
import consoleAllKeys from './consoleAllKeys.ts';

const StateProgram = () => {
  const [keys, setKeys] = useState(null);
  const [connect, setConnect] = useState(null);
  const [phantom, setPhantom] = useState(null);
  const [accInfo, setAccInfo] = useState(null);
  const [setInfo, setSetInfo] = useState(null);
  const [incHash, setIncHash] = useState(null);
  const [decHash, setDecHash] = useState(null);
  const [counterHash, setCounterHash] = useState(null);
  const [settingsHash, setSettingsHash] = useState(null);
  const [admBalance, setAdmBalance] = useState(null);
  const [usrBalance, setUsrBalance] = useState(null);
  const [phantomBalance, setPhantomBalance] = useState(null);

  useEffect(() => {
    const url = clusterApiUrl('devnet');
    const connection = new Connection(url, 'confirmed');

    initWithPhantom(connection).then((data: {}) => !keys && setKeys(data));
    // init(connection).then((data: {}) => !keys && setKeys(data));

    setConnect(connection);
    // eslint-disable-next-line
  }, []);

  useEffect(() => setPhantom(connectPhantom()), []);

  const getCounterInfo = async () =>
    setAccInfo(await readCounterAccount(keys, connect));

  const getSettingsInfo = async () =>
    setSetInfo(await readSettingsAccount(keys, connect));

  const decrement = async () => {
    const hash = await decCounter(keys, connect);
    setDecHash(`https://explorer.solana.com/tx/${hash}?cluster=devnet`);
  };

  const increment = async () => {
    const hash = await incCounter(keys, connect);
    setIncHash(`https://explorer.solana.com/tx/${hash}?cluster=devnet`);
  };

  const createCounter = async () => {
    const hash = await createCounterAndInc(keys, connect, phantom);
    console.log('hash:', hash);
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
          {`user: ${keys && keys.userKeypair.publicKey.toBase58()}`}
        </p>
        <p>{`program: ${keys && keys.programKeypair.publicKey.toBase58()}`}</p>
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

export default StateProgram;
