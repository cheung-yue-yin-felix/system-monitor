const WeekDay = ({ weekday }) => {
  return (
    <div
      style={{
        fontFamily: '"Tektur", sans-serif',
        fontSize: '24px',
        textAlign: 'center',
        paddingTop: '1px',
        paddingBottom: '1px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {weekday}
    </div>
  );
};

export default WeekDay;
