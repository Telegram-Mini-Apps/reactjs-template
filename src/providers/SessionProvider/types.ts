import { TelegramWebAppDataUserInput } from '@/utils';
import { ReactNode } from 'react';

export interface AccessTokenParams {
  query_id: string;
  user: TelegramWebAppDataUserInput;
  auth_date: number;
  hash: string;
  checkDataString: string;
}

export interface SessionProviderProps {
  children: ReactNode;
}

export interface SessionContextProps {
  sessionToken: string | null;
  setSessionToken: (session: string | null) => void;
  isLoading: boolean;
  error: boolean;
}
