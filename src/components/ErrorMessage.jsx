import { useTranslation } from 'react-i18next';

export default function ErrorMessage({ error }) {
  const { t } = useTranslation();
  const dpr = window.devicePixelRatio;
  return (
    <div
      className="card"
      style={{
        '--dpr': dpr,
        textAlign: 'center',
        verticalAlign: 'middle',
        color: 'red'
      }}
    >
      {`${t('messages.generalError')} ${error}`}
    </div>
  )
}