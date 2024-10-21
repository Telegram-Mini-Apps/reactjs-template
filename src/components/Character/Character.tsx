import * as S from './Character.styles';

interface Clothes {
  photo: string;
  x: number;
  y: number;
}

interface CharacterProps {
  photo: string;
  clothes?: Clothes[];
}

export const Character = ({ photo, clothes }: CharacterProps) => {
  return (
    <S.Wrapper >
      <S.Character src={photo}/>
      {clothes?.map((clothesItem, index) => (
        <S.ClothesItem key={index} src={clothesItem.photo} x={clothesItem.x} y={clothesItem.y}/>
      ))}
    </S.Wrapper>
  );
};
