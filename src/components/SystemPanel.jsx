import { CpuCard, GpuCard, RamCard, NetworkCard, DiskCard } from '../features/systemMonitor';
import { useMetricsStream } from '../features/systemMonitor/hooks';
import { useTranslation } from 'react-i18next';

export default function SystemPanel() {
  const { t } = useTranslation();
  const { data, status, error, } = useMetricsStream();

  console.log('Connection Status: ', status);

  return (
    <>
      {error && <div>{t('message.connectionError')}</div>}

      {!data ? (
        <div>{t('message.waitingForData')}</div>
      ) : (
        <ul className="main-grid">
          <li><CpuCard cpu={data.cpu} /></li>
          <li><RamCard ram={data.memory} /></li>
          <li><GpuCard gpu={data.gpu} /></li>
          {data.network.map(nic => {
            return (
              <li key={nic.name}>
                <NetworkCard network={nic} />
              </li>
            )
          })}
          {data.disk.map(disk => {
            return (
              <DiskCard disk={disk} key={disk.diskName}/>
            )
          })}
        </ul>
      )}
    </>
  );
}
