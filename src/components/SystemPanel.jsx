import { CpuCard, GpuCard, RamCard, NetworkCard, DiskCard } from '../features/systemMonitor';
import { useMetricsStream } from '../features/systemMonitor/hooks';
import { useTranslation } from 'react-i18next';
import ErrorMessage from './ErrorMessage.jsx';
import Loading from './Loading.jsx';

export default function SystemPanel() {
  const { t } = useTranslation();
  const { data, status, error, } = useMetricsStream();

  console.log('Connection Status: ', status);

  return (
    <>
      {error && <ErrorMessage error={error} />}

      {!data ? (
        <Loading />
      ) : (
        <ul className="main-grid">
          {data.cpu && <li><CpuCard cpu={data.cpu} /></li>}
          {data.cpus && data.cpus.map((cpu, index) => {
            return <li key={index}><CpuCard cpu={cpu} /></li>
          })}
          {data.gpu && <li><GpuCard gpu={data.gpu} /></li>}
          {data.gpus && data.gpus.map((gpu, index) => {
            return <li key={index}><GpuCard gpu={gpu} /></li>;
          })}
          <RamCard ram={data.ram} />
          <NetworkCard networks={data.networks} />
          {data.disks.map(disk => {
            return (
              <DiskCard disk={disk} key={disk.name}/>
            )
          })}
        </ul>
      )}
    </>
  );
}
