import { useState, useEffect } from 'react';
import { isGraphqlError, TelegramWebAppDataUserInput } from '@/utils';
import { gql, useMutation } from '@apollo/client';

interface AccessTokenParams {
  query_id: string;
  user: TelegramWebAppDataUserInput;
  auth_date: number;
  hash: string;
  checkDataString: string;
}

const LOGIN_WITH_ACCESS_TOKEN = gql`
  mutation TelegramUserLogin($webAppData: TelegramWebAppDataInput!) {
    telegramUserLogin(webAppData: $webAppData) {
      access_token
    }
  }
`;

const useAccessToken = (webAppData: AccessTokenParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [sessionToken, setSessionToken] = useState<string>('');

  const [request, { data }] = useMutation(LOGIN_WITH_ACCESS_TOKEN);

  useEffect(() => {
    const handleRequest = async (webAppData: AccessTokenParams) => {
      setIsLoading(true);
      await request({
        variables: {
          webAppData,
        },
      })
        .then(async (result) => {
          if (result.data) {
            setSessionToken(result.data.getAccessToken.token);
          }
        })
        .catch(async (error) => {
          setError(isGraphqlError(error, 'FULL_MAINTENANCE') ?? error.message);
        })
        .finally(() => setIsLoading(false));
    };

    handleRequest(webAppData);
  }, []);

  return { error, loading: isLoading, sessionToken };
};

export default useAccessToken;
