import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { BusinessLogicContextProps } from '@/providers/BusinessLogicProvider/types.ts';
import { useQuery } from '@apollo/client';
import { GET_GAME_CONFIG } from '@/providers/BusinessLogicProvider/queries.ts';

export const BusinessLogicContext = createContext<BusinessLogicContextProps | undefined>({
  tapWeight: 0,
  setTapWeight: () => undefined,

  earned: 0,
  setEarned: () => undefined,

  level: 0,
  setLevel: () => undefined,

  currentBossHealth: 0,
  setCurrentBossHealth: () => undefined,

  currentBossMaxHealth: 0,
  setCurrentBossMaxHealth: () => undefined,

  energy: 0,
  setEnergy: () => undefined,

  maxEnergy: 0,
  setMaxEnergy: () => undefined,

  loading: false,
  setLoading: () => undefined,

  error: '',
  setError: () => undefined,

  onUserTap: () => undefined,

  isTapAreaDisabled: false,
  setIsTapAreaDisabled: () => undefined,

  gameConfig: {
    coinsAmount: 0,
    currentBoss: {
      currentHealth: 0,
      level: 0,
      maxHealth: 0,
    },
    currentEnergy: 0,
    energyLimitLevel: 0,
    energyRechargeLevel: 0,
    energyRechargedAt: new Date(),
    freeBoosts: {
      currentRefillEnergyAmount: 0,
      currentTurboAmount: 0,
      maxRefillEnergyAmount: 0,
      maxTurboAmount: 0,
      refillEnergyAmountLastRechargeDate: new Date(),
      refillEnergyLastActivatedAt: new Date(),
      turboAmountLastRechargeDate: new Date(),
      turboLastActivatedAt: new Date(),
    },
    maxEnergy: 0,
    nonce: 0,
    tapBotLevel: 0,
    weaponLevel: 0,
  },
  refetchGameConfig: () => undefined,
  loadingGameConfig: true,
  errorGameConfig: undefined,
});

const BusinessLogicProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tapWeight, setTapWeight] = useState(1);
  const [earned, setEarned] = useState(0);
  const [level, setLevel] = useState(0);
  const [currentBossHealth, setCurrentBossHealth] = useState(0);
  const [currentBossMaxHealth, setCurrentBossMaxHealth] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [maxEnergy, setMaxEnergy] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isTapAreaDisabled, setIsTapAreaDisabled] = useState(false);

  const {
    data: gameConfig,
    refetch: refetchGameConfig,
    loading: loadingGameConfig,
    error: errorGameConfig,
  } = useQuery(GET_GAME_CONFIG);

  const onUserTap = useCallback(() => {
    setEarned((prev) => prev + 1);
    setEnergy((prev) => prev - 1);
    setCurrentBossHealth((prev) => prev - 1);
  }, []);

  const providerData: BusinessLogicContextProps = {
    tapWeight,
    setTapWeight,
    earned,
    setEarned,
    level,
    setLevel,
    currentBossHealth,
    setCurrentBossHealth,
    currentBossMaxHealth,
    setCurrentBossMaxHealth,
    energy,
    setEnergy,
    maxEnergy,
    setMaxEnergy,
    loading,
    setLoading,
    error,
    setError,
    onUserTap,
    isTapAreaDisabled,
    setIsTapAreaDisabled,
    gameConfig: gameConfig?.telegramGameGetConfig,
    refetchGameConfig,
    loadingGameConfig,
    errorGameConfig,
  };

  useEffect(() => {
    const energyRecovery = setInterval(() => setEnergy((prev) => (prev < maxEnergy ? prev + 1 : prev)), 1000);

    return () => clearInterval(energyRecovery);
  });

  useEffect(() => {
    if (energy <= 0) {
      setIsTapAreaDisabled(true);
    } else {
      setIsTapAreaDisabled(false);
    }
  }, [energy]);

  useEffect(() => {
    if (gameConfig) {
      const {
        coinsAmount,
        currentBoss: { level, currentHealth, maxHealth },
        maxEnergy,
        currentEnergy,
      } = gameConfig.telegramGameGetConfig;

      setEarned(coinsAmount ?? 0);
      setLevel(level ?? 0);
      setCurrentBossHealth(currentHealth ?? 0);
      setCurrentBossMaxHealth(maxHealth ?? 0);
      setEnergy(currentEnergy ?? 0);
      setMaxEnergy(maxEnergy ?? 0);
    }
  }, [gameConfig]);

  return <BusinessLogicContext.Provider value={providerData}>{children}</BusinessLogicContext.Provider>;
};

export default BusinessLogicProvider;
