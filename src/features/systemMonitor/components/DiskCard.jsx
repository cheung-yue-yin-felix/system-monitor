import { useTranslation } from 'react-i18next';

export default function DiskCard({disk}) {
  const {t} = useTranslation();
  const dpr = window.devicePixelRatio;
  return (
    <>
      {disk.partitions.map(partition => {
        return partition.volumes.map(volume => {
          return (
            <div
              key={volume.name}
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
                <img src={'./hardware_icons/storage-device.png'} alt="storage-device" />
              </div>
              <div
                style={{
                  gridColumn: '1 / 3'
                }}
              >
                {disk.name}
              </div>
              <div>{t('labels.driveLetter')}</div>
              <div>{volume.name}</div>
              <div>{t('labels.freeSpaceGb')}</div>
              <div>{volume.freeSpace}</div>
              <div>{t('labels.totalSpace')}</div>
              <div>{volume.totalSpace}</div>
            </div>
          )
        })
      })}
    </>
  )
}
