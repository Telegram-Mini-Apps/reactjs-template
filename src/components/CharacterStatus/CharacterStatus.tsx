import { useCharactersById } from '@/api/user';

import * as S from './CharacterStatus.styles';
import { getHappinessStatusByPercent } from '@/helpers';

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
            getHappinessStatusByPercent(happiness)
          }</S.Text>
      )}
    </S.Wrapper>
  );
};
