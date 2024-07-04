import { gql } from '@apollo/client';

export const SEND_TAP_COUNT = gql`
  mutation TelegramGameProcessTapsBatch($payload: TelegramGameTapsBatchInput!) {
    telegramGameProcessTapsBatch(payload: $payload) {
      coinsAmount
    }
  }
`;
