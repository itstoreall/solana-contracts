const TokenTransferInside = () => {
  const init = () => {
    console.log('init');
  };
  return (
    <div style={{ paddingBottom: '40px', fontSize: '14px' }}>
      <div style={{ padding: '20px', backgroundColor: 'pink' }}>
        <p style={{ marginBottom: '10px' }}>{`admin: ${111}`}</p>
        <p style={{ marginBottom: '10px' }}>{`user: ${222}`}</p>
        <p>{`program: ${333}`}</p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #999',
        }}
      >
        <div style={{ padding: 40 }}>
          <button onClick={() => init()}>init</button>
        </div>
        <div style={{ padding: 40 }}>
          <span style={{ marginRight: '20px' }}>{111}</span>
          <span>{222}</span>
        </div>
      </div>
    </div>
  );
};

export default TokenTransferInside;
