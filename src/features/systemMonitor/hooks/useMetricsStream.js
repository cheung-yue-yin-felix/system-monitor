import { useState, useEffect, useRef } from "react";
import config from '../../../config.json'

export function useMetricsStream() {
  const apiKey = config.systemMonitorApi.apiKey;
  const baseUrl = config.systemMonitorApi.baseUrl;
  const url = `${baseUrl}/api/metrics/stream?apiKey=${apiKey}`;

  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const esRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    setStatus('connecting');
    const es = new EventSource(url);
    esRef.current = es;

    es.onopen = () => {
      setStatus('open');
      setError(null);
    };

    es.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        setData(payload);
      } catch (e) {
        console.error('Failed to parse SSE payload', e);
      }
    };

    es.onerror = () => {
      setStatus('error');
      setError(new Error('EventSource connection failed'));
    };

    return () => {
      es.close();
      setStatus('closed');
    };
  }, [url]);

  return {data, status, error};
}