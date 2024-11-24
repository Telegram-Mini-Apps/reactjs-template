import { useCharactersById } from '@/api/user';
import * as S from './Character.styles';
import { MOCK_CHARACTERS } from '@/mock';
import { getHappinessStatusByPercent } from '@/helpers';
interface Clothes {
  photo: string;
  clothes_type_id: number;
  x: number;
  y: number;
}

interface CharacterProps {
  photo: string;
  clothes?: Clothes[];
}

export const Character = ({ clothes }: CharacterProps) => {
  const { data, isLoading, isError } = useCharactersById(1);

  if (isLoading || isError) {
    return null;
  }

  const happiness = data!.data[0].happiness_percent;
  const happinessStatus = getHappinessStatusByPercent(happiness);

  const currentCharacter = MOCK_CHARACTERS
    .find(({ status }) => status === happinessStatus)

  return (
    <S.Wrapper >
      <S.Character src={currentCharacter?.photo}/>
      {clothes?.map((clothesItem, index) => (
        <S.ClothesItem
          key={index}
          src={clothesItem.photo}
          x={clothesItem.x}
          y={clothesItem.y}
          clothes_type_id={clothesItem.clothes_type_id}
          />
      ))}
    </S.Wrapper>
  );
};
