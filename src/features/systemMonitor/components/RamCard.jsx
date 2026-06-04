import { useTranslation } from 'react-i18next';

export default function RamCard({ ram })  {
  const dpr = window.devicePixelRatio;
  const { t } = useTranslation();
  return (
    <>
      <li>
        <div
          className="card"
          style={{
            '--dpr': dpr,
            display: 'grid',
            gridTemplateColumns: '100px 150px',
            gap: '0px',
            alignItems: 'center',
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
            className="card"
            style={{
              '--dpr': dpr,
              display: 'grid',
              gridTemplateColumns: '100px 150px',
              gap: '0px',
              alignItems: 'center',
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
