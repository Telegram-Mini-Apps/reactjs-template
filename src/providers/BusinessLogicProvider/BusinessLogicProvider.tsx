import { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { BusinessLogicContextProps } from '@/providers/BusinessLogicProvider/types.ts';

export const BusinessLogicContext = createContext<BusinessLogicContextProps | undefined>({
  count: 0,
  setCount: () => undefined,

  energy: 0,
  setEnergy: () => undefined,

  loading: false,
  setLoading: () => undefined,

  error: '',
  setError: () => undefined,

  onUserTap: () => undefined,
});

const BusinessLogicProvider: FC<PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onUserTap = useCallback(() => {}, []);

  const providerData = {
    count,
    setCount,
    energy,
    setEnergy,
    loading,
    setLoading,
    error,
    setError,
    onUserTap,
  };

  useEffect(() => {
    // const fetchData = setInterval(() => {
    //   // fetch data from API
    // }, 5000)
    //
    //
    // return () => clearInterval(fetchData)
  }, []);

  return (
    <BusinessLogicContext.Provider value={providerData}>
      {children}
    </BusinessLogicContext.Provider>
  );
};

export default BusinessLogicProvider;
