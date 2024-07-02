import { gql } from '@apollo/client';

export const SEND_TAP_COUNT = gql`
  mutation TelegramGameProcessTapsBatch($payload: TelegramGameTapsBatchInput!) {
    telegramGameProcessTapsBatch(payload: $payload) {
      coinsAmount
    }
  }
`;

export const GET_HASHED_USER_BALANCE = gql`
  query TelegramGameGetConfig {
    telegramGameGetConfig {
      nonce
    }
  }
`
