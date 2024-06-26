import { createContext, FC, useEffect, useState } from 'react';
import { isGraphqlError, TelegramWebAppDataUserInput, transformInitData } from '@/utils';
import { useMutation } from '@apollo/client';
import { useInitData, useLaunchParams } from '@tma.js/sdk-react';
import { AccessTokenParams, LOGIN_WITH_ACCESS_TOKEN, SessionContextProps, SessionProviderProps } from '@/providers';

export const SessionContext = createContext<SessionContextProps | undefined>({
  sessionToken: null,
  setSessionToken: () => undefined,
  isLoading: false,
  error: false,
});

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [request] = useMutation(LOGIN_WITH_ACCESS_TOKEN);

  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData();
  const transformedAuthDate = initData?.authDate ? Math.floor(initData.authDate.getTime() / 1000) : 0;

  const data: AccessTokenParams = {
    auth_date: transformedAuthDate,
    checkDataString: (initDataRaw && transformInitData(initDataRaw)) ?? '',
    hash: initData?.hash ?? '',
    query_id: initData?.queryId ?? '',
    user: {
      id: initData?.user?.id || 0,
      first_name: initData?.user?.firstName || '',
      last_name: initData?.user?.lastName || '',
      username: initData?.user?.username || '',
      language_code: initData?.user?.languageCode || '',
      allows_write_to_pm: initData?.user?.allowsWriteToPm || false,
    },
  };

  useEffect(() => {
    const handleRequest = async (webAppData: AccessTokenParams) => {
      setIsLoading(true);

      const accessToken = localStorage.getItem('access_token');

      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        setSessionToken(`Bearer ${accessToken}`);
        return;
      }

      if (sessionToken) {
        localStorage.setItem('access_token', sessionToken);
        return;
      }

      try {
        const response = await request({
          variables: {
            webAppData,
          },
        })

        if (!response.data) {
          throw new Error('Failed load session data')
        }

        setSessionToken(`Bearer ${response.data.telegramUserLogin.access_token}`);
        localStorage.setItem('access_token', response.data.telegramUserLogin.access_token);
      } catch (error: any) {
        setError(isGraphqlError(error, 'FULL_MAINTENANCE') ?? error.message);
      } finally {
        setIsLoading(false)
      }
    };

    handleRequest(data);
  }, []);

  return (
    <SessionContext.Provider value={{ sessionToken, setSessionToken, isLoading, error }}>
      {children}
    </SessionContext.Provider>
  );
};
