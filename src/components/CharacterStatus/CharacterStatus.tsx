import React from 'react';

import { useCharactersById } from '@/api/user';
import { HappinesStatuses } from '@/constants/bussiness';

import * as S from './CharacterStatus.styles';

export const CharacterStatus = () => {
  const { data, isLoading, isError } = useCharactersById(1);

  const happiness = data?.data[0].happiness_percent;

  if (isError) {
    return <p>Ошибка при получении</p>
  }

  return (
    <S.Wrapper>
      {isLoading ? <p>Загрузка...</p> : (
        <S.Text>{
            happiness &&
            HappinesStatuses
            .reverse()
            .find(status => status.edge <= happiness)
            ?.status
          }</S.Text>
      )}
    </S.Wrapper>
  );
};
