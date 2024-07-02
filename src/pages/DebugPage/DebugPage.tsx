import { FC } from 'react';
import { useSession } from '@/hooks';

const DebugPage: FC = () => {
  const { sessionToken } = useSession();

  return (
    <>
      <h1>Debug page</h1>
      <p>TOKEN: {sessionToken}</p>
    </>
  );
};

export default DebugPage;
