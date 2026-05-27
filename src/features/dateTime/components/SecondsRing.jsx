import { useSecondsRing } from '../hooks';

const SecondsRing = ({ seconds }) => {
  const canvasRef = useSecondsRing(seconds);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
        borderRadius: '28px',
        pointerEvents: 'none',
      }}
    />
  );
};

export default SecondsRing;
