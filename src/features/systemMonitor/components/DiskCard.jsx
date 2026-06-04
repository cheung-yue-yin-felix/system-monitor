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
