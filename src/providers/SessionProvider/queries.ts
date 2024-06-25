import { gql } from '@apollo/client';

export const LOGIN_WITH_ACCESS_TOKEN = gql`
  mutation TelegramUserLogin($webAppData: TelegramWebAppDataInput!) {
    telegramUserLogin(webAppData: $webAppData) {
      access_token
    }
  }
`;
