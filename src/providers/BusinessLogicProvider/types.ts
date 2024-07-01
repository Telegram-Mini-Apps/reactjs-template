import React from "react";

type setFunctionType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface BusinessLogicContextProps {
  tapWeight: number;
  setTapWeight: setFunctionType<number>;

  earned: number;
  setEarned: setFunctionType<number>;

  count: number;
  setCount: setFunctionType<number>;

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
}
