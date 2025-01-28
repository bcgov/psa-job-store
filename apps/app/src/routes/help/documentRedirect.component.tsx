import { Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VITE_BACKEND_URL } from '../../../envConfig';

const DocumentRedirect = () => {
  const { url } = useParams();

  useEffect(() => {
    const encodedUrl = encodeURIComponent(url ?? '');
    const backendUrl = `${VITE_BACKEND_URL}/document/${encodedUrl}/file`;

    // Redirect to the backend endpoint
    window.location.href = backendUrl;
  }, [url]);

  return <Spin />;
};

export default DocumentRedirect;
