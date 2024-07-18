import React from 'react';
import { ApolloError, ApolloQueryResult, OperationVariables } from '@apollo/client';

type setFunctionType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface BusinessLogicContextProps {
  tapWeight: number;
  setTapWeight: setFunctionType<number>;

  earned: number;
  setEarned: setFunctionType<number>;

  level: number;
  setLevel: setFunctionType<number>;

  currentBossHealth: number;
  setCurrentBossHealth: setFunctionType<number>;

  currentBossMaxHealth: number;
  setCurrentBossMaxHealth: setFunctionType<number>;

  energy: number;
  setEnergy: setFunctionType<number>;

  maxEnergy: number;
  setMaxEnergy: setFunctionType<number>;

  loading: boolean;
  setLoading: setFunctionType<boolean>;

  error: string;
  setError: setFunctionType<string>;

  onUserTap: () => void;

  isTapAreaDisabled: boolean;
  setIsTapAreaDisabled: setFunctionType<boolean>;

  gameConfig: TelegramGameConfig;
  refetchGameConfig: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>> | undefined;
  loadingGameConfig: boolean;
  errorGameConfig: ApolloError | undefined;
}

export interface ICurrentBoss {
  currentHealth: number;
  level: number;
  maxHealth: number;
}

export type IFreeBoosts = {
  currentRefillEnergyAmount: number;
  currentTurboAmount: number;
  maxRefillEnergyAmount: number;
  maxTurboAmount: number;
  refillEnergyAmountLastRechargeDate: Date;
  refillEnergyLastActivatedAt: Date;
  turboAmountLastRechargeDate: Date;
  turboLastActivatedAt: Date;
};

export interface TelegramGameConfig {
  coinsAmount: number;
  currentBoss: ICurrentBoss;
  currentEnergy: number;
  energyLimitLevel: number;
  energyRechargeLevel: number;
  energyRechargedAt: Date;
  freeBoosts: IFreeBoosts;
  maxEnergy: number;
  nonce: number;
  tapBotLevel: number;
  weaponLevel: number;
}

export interface GameConfig {
  telegramGameGetConfig: TelegramGameConfig;
}
