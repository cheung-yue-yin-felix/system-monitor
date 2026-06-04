import { useTranslation } from 'react-i18next';

export default function NetworkCard({ networks })  {
  const dpr = window.devicePixelRatio;
  const { t } = useTranslation();
  const networkInfo = networks.find(network => network.ipAddresses.length > 0);
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
            overflowWrap: 'break-word',
          }}
        >
          <div className="hardware-icon">
            <img src={'./hardware_icons/web.png'} alt="network-icon" />
          </div>
          <div style={{gridColumn: '1/3'}}>{`${t('labels.macAddress')} / ${t('labels.ipAddresses')}`}</div>
          <div>{t('labels.macAddress')}</div>
          <div>{networkInfo.macAddress}</div>
          {networkInfo.ipAddresses.map((address, i) => (
            <>
              <div key={i}>{`${t('labels.ipAddresses')} #${i}`}</div>
              <div>{address}</div>
            </>
          ))}
        </div>
      </li>
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
            overflowWrap: 'break-word',
          }}
        >
          <div className="hardware-icon">
            <img src={'./hardware_icons/web.png'} alt="network-icon" />
          </div>
          <div style={{gridColumn: '1/3'}}>{`${t('labels.ipSubnets')} / ${t('labels.defaultIpGateways')}`}</div>
          {networkInfo.ipSubnets.map((subnet, i) => (
            <>
              <div key={i}>{`${t('labels.ipSubnets')} #${i}`}</div>
              <div>{subnet}</div>
            </>
          ))}
          {networkInfo.defaultIpGateways.map((gateway, i) => (
            <>
              <div key={i}>{`${t('labels.defaultIpGateways')} #${i}`}</div>
              <div>{gateway}</div>
            </>
          ))}
        </div>
      </li>
      {networks.map(network => (
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
            <img src={'./hardware_icons/web.png'} alt="network-icon" />
          </div>
          <div style={{gridColumn: '1 / 3'}}>{network.name}</div>
          <div>{t('labels.uploadKbps')}</div>
          <div>{network.uploadSpeed}</div>
          <div>{t('labels.downloadKbps')}</div>
          <div>{network.downloadSpeed}</div>
        </div>
      ))}
    </>
  )
}
