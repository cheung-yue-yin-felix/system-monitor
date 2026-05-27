const Time = ({ timeStr }) => {
  return (
    <div
      style={{
        gridColumn: '1 / 3',
        fontFamily: '"Tektur", sans-serif',
        fontSize: '48px',
        fontWeight: 400,
        textAlign: 'center',
        paddingTop: '1px',
        paddingBottom: '1px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {timeStr}
    </div>
  );
};

export default Time;
