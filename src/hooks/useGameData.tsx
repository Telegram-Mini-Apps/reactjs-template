import { useContext } from 'react';
import { BusinessLogicContextProps } from '@/providers/BusinessLogicProvider/types.ts';
import { BusinessLogicContext } from '@/providers/BusinessLogicProvider/BusinessLogicProvider.tsx';

export const useGameData = (): BusinessLogicContextProps => {
  const context = useContext(BusinessLogicContext);

  if (!context) {
    throw new Error('useGameData must be used within a BusinessLogicProvider');
  }

  return context;
};
