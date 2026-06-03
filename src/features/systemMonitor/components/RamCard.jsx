import { useTranslation } from 'react-i18next';

export default function RamCard({ ram })  {
  const dpr = window.devicePixelRatio;
  const { t } = useTranslation();
  return (
    <>
      <li>
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
            gridTemplateColumns: '100px 150px',
            gap: '0px',
            alignItems: 'center',
            position: 'relative',
            padding: '18px 22px',
            textAlign: 'center',
            fontSize: '18px',
          }}
        >
          <div className="hardware-icon">
            <img src={'./hardware_icons/ram.png'} alt="ram-icon" />
          </div>
          <div style={{gridColumn: '1/3' }}>{t('labels.ram')}</div>
          <div>{t('labels.usedMemory')}</div>
          <div>{ram.usedMemory}</div>
          <div>{t('labels.availableMemory')}</div>
          <div>{ram.availableMemory}</div>
          <div>{t('labels.totalMemory')}</div>
          <div>{ram.totalMemory}</div>
        </div>
      </li>
      {ram.modules?.map((module, index) => (
        <li key={index}>
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
              gridTemplateColumns: '100px 150px',
              gap: '0px',
              alignItems: 'center',
              position: 'relative',
              padding: '18px 22px',
              textAlign: 'center',
              fontSize: '18px',
              overflowWrap: 'break-word',
            }}
            >
            <div className="hardware-icon">
              <img src={'./hardware_icons/ram.png'} alt="ram-icon" />
            </div>
            <div style={{gridColumn: '1/3'}}>{`${t('labels.module')} #${index}`}</div>
            <div key={`mod-n-${index}`}>{t('labels.moduleName')}</div>
            <div key={`mod-nv-${index}`}>{module.name}</div>
            <div key={`mod-s-${index}`}>{t('labels.moduleSize')}</div>
            <div key={`mod-sv-${index}`}>{module.size}</div>
            <div key={`mod-t-${index}`}>{t('labels.type')}</div>
            <div key={`mod-tv-${index}`}>{module.type}</div>
            <div key={`mod-f-${index}`}>{t('labels.formFactor')}</div>
            <div key={`mod-fv-${index}`}>{module.formFactor}</div>
          </div>
        </li>
      ))}
    </>
  )
}
