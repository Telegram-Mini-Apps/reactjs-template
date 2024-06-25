import { SessionContext, SessionContextProps } from '@/providers';
import { useContext } from 'react';

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }

  return context;
};
