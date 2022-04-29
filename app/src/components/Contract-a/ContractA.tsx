// @ts-nocheck
import { useState } from 'react';
import AContext from './context';
import constants from './constants';

// --- Components: ---
import ConnectComponent from './Connect.tsx';
import KeypairComponent from './Keypair.tsx';
import FundComponent from './Fund.tsx';
import BalanceComponent from './Balance.tsx';
import TransferComponent from './Transfer.tsx';
import AccountInfoComponent from './AccInfo.tsx';
import SecondAccComponent from './SecondAcc.tsx';
// import GetterComponent from './Getter.tsx';
// import SetterComponent from './Setter.tsx';
// -------------------

const ContractA = () => {
  const [accountID, setAccountID] = useState(constants.ACCOUNT_ID);
  const [accSecretID, setAccSecretID] = useState(constants.ACCOUNT_SECRET);
  const [recipientID, setRecipientID] = useState(constants.RECIPIENT_ID);
  const [programID, setProgramID] = useState(constants.PROGRAM_ID);
  const [newProgramID, setNewProgramID] = useState(constants.SECOND_PROGRAM_ID);

  const [connect, setConnect] = useState(false);
  const [keypair, setKeypair] = useState(false);
  const [fund, setFund] = useState(false);
  const [balance, setBalance] = useState(false);
  const [transfer, setTransfer] = useState(false);
  const [accountInfo, setAccountInfo] = useState(false);
  const [secondAcc, setSecondAcc] = useState(false);
  // const [greeting, setGreeting] = useState(false);
  // const [setter, setSetter] = useState(false);

  return (
    <AContext.Provider
      value={{
        accountID,
        setAccountID,
        accSecretID,
        setAccSecretID,
        recipientID,
        setRecipientID,
        programID,
        setProgramID,
        newProgramID,
        setNewProgramID,
      }}
    >
      <div style={{ paddingBottom: '40px', fontSize: '14px' }}>
        <div style={{ padding: '20px' }}>
          <p>{`accountID: ${accountID}`}</p>
          <p>{`accSecretID: ${accSecretID.slice(0, 50)} ...`}</p>
          <p>{`recipientID: ${recipientID}`}</p>
          <p>{`programID: ${programID}`}</p>
          <p>{`newProgramID: ${newProgramID}`}</p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #999',
          }}
        >
          <div style={{ padding: 40 }}>
            <button onClick={() => setConnect(true)}>Get connect</button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{connect && <ConnectComponent />}</div>
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
            <button disabled onClick={() => setKeypair(true)}>
              Get keypair
            </button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{keypair && <KeypairComponent />}</div>
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
            <button onClick={() => setFund(true)}>Get funding</button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{fund && <FundComponent />}</div>
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
            <button onClick={() => setBalance(true)}>Get balance</button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{balance && <BalanceComponent />}</div>
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
            <button onClick={() => setTransfer(true)}>Make transf</button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{transfer && <TransferComponent />}</div>
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
            <button onClick={() => setAccountInfo(true)}>Get acc info</button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{accountInfo && <AccountInfoComponent />}</div>
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
            <button disabled onClick={() => setSecondAcc(true)}>
              Crt new acc
            </button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{secondAcc && <SecondAccComponent />}</div>
          </div>
        </div>

        {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #999',
          }}
        >
          <div style={{ padding: 40 }}>
            <button onClick={() => setGreeting(true)}>Get greeting</button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{greeting && <GetterComponent />}</div>
          </div>
        </div> */}
        {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #999',
          }}
        >
          <div style={{ padding: 40 }}>
            <button onClick={() => setSetter(true)}>Send greeting</button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{setter && <SetterComponent />}</div>
          </div>
        </div> */}
      </div>
    </AContext.Provider>
  );
};

export default ContractA;
