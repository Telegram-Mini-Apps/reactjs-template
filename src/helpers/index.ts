import { Happines } from "@/constants/bussiness"

export const getHappinessStatusByPercent = (percent: number) => Happines
  .find(el => percent <= el.edge)?.status;
