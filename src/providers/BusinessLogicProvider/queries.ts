import { gql } from '@apollo/client';

export const GET_GAME_CONFIG = gql`
  query TelegramGameGetConfig {
    telegramGameGetConfig {
      coinsAmount
      currentEnergy
      maxEnergy
      energyRechargedAt
      weaponLevel
      energyLimitLevel
      energyRechargeLevel
      tapBotLevel
      currentBoss {
        level
        currentHealth
        maxHealth
      }
      freeBoosts {
        currentTurboAmount
        maxTurboAmount
        turboLastActivatedAt
        turboAmountLastRechargeDate
        currentRefillEnergyAmount
        maxRefillEnergyAmount
        refillEnergyLastActivatedAt
        refillEnergyAmountLastRechargeDate
      }
      nonce
    }
  }
`;
