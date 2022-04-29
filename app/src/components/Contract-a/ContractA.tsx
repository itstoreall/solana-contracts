// @ts-nocheck
import { useState } from 'react';
import AContext from './context';
import constants from './constants';

// --- Components: ---
import ConnectComponent from './Connect.tsx';
import KeypairComponent from './Keypair.tsx';
import FundComponent from './Fund.tsx';
// import BalanceComponent from './Balance.tsx';
// import TransferComponent from './Transfer.tsx';
// import DeployComponent from './Deploy.tsx';
// import GreeterComponent from './Greeter.tsx';
// import GetterComponent from './Getter.tsx';
// import SetterComponent from './Setter.tsx';
// -------------------

const ContractA = () => {
  const [accountID, setAccountID] = useState(constants.ACCOUNT_ID);
  const [accSecretID, setAccSecretID] = useState(constants.ACCOUNT_SECRET);
  const [recipientID, setRecipientID] = useState(constants.RECIPIENT_ID);
  const [programID, setProgramID] = useState(
    'Bqo8fvsrNRfxm3GPcAFqHCzJe2JQB6m5MFyxdaHwin1Z' // +
  );
  const [newProgramID, setNewProgramID] = useState(
    'EGcUbQ51CCwrDuuEk6u8L6QeAHoMsZitkid8mA2Wz2Ye'
  );

  const [connect, setConnect] = useState(false);
  const [keypair, setKeypair] = useState(false);
  const [fund, setFund] = useState(false);
  // const [balance, setBalance] = useState(false);
  // const [transfer, setTransfer] = useState(false);
  // const [deploy, setDeploy] = useState(false);
  // const [greeter, setGreeter] = useState(false);
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
      <div style={{ fontSize: '14px' }}>
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

        {/* <div
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
        </div> */}
        {/* <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #999',
          }}
        >
          <div style={{ padding: 40 }}>
            <button onClick={() => setTransfer(true)}>Make transfer</button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{transfer && <TransferComponent />}</div>
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
            <button onClick={() => setDeploy(true)}>Get prog info</button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{deploy && <DeployComponent />}</div>
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
            <button disabled onClick={() => setGreeter(true)}>
              Create greeter
            </button>
          </div>
          <div style={{ padding: 40 }}>
            <div>{greeter && <GreeterComponent />}</div>
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
