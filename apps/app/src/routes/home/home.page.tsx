import { useAuth } from 'react-oidc-context';

export const HomePage = () => {
  const auth = useAuth();

  return (
    <div style={{ margin: '1rem 2rem' }}>
      <h1 style={{ marginBottom: 0 }}>Hello, {auth.user?.profile.name}</h1>
    </div>
  );
};
