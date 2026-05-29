import { useTranslation } from 'react-i18next';

export default function GpuCard({ gpu })  {
  const dpr = window.devicePixelRatio;
  const { t } = useTranslation();
  return (
    <div
      style={{
        '--dpr': dpr,
        width: 'calc(300px / var(--dpr))',
        height: 'calc(300px / var(--dpr))',
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        borderRadius: '18px',
        fontFamily: '"Tektur", sans-serif',
        color: 'white',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '0px',
        alignItems: 'center',
        position: 'relative',
        padding: '18px 22px',
        textAlign: 'center',
        fontSize: '18px',
      }}
    >
      <div className="hardware-icon">
        <img src={'./hardware_icons/gpu.png'} alt="gpu-icon" />
      </div>
      <div
        style={{
          gridColumn: '1 / 3',
        }}
      >
        {gpu.name}
      </div>
      <div>{t('labels.clockMHz')}</div>
      <div>{`${gpu.clockMHz}MHz`}</div>
      <div>{t('labels.usagePercent')}</div>
      <div>{`${gpu.usagePercent}%`}</div>
      <div>{t('labels.usage3DPercent')}</div>
      <div>{`${gpu.usage3DPercent}%`}</div>
      <div>{t('labels.vramUsageMb')}</div>
      <div>{`${gpu.vramUsageMb}MB`}</div>
      <div>{t('labels.temperatureC')}</div>
      <div>{`${gpu.temperatureC}°C`}</div>
      <div>FPS</div>
      <div>{gpu.fps}</div>
    </div>
  )
}