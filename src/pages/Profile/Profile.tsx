import { useState } from "react";

import { useClothesByUserId, useLocationsByUserId, useUserById } from "@/api/user";

import * as S from "./Profile.styles";

export const Profile = () => {
  const [id, _] = useState(1);

  const {
    data: userData,
    isLoading,
  } = useUserById(id);

  const {
    data: clothesData,
    isLoading: isClothesLoading,
  } = useClothesByUserId(id);

  const {
    data: locationsData,
    isLoading: isLocationsLoading,
  } = useLocationsByUserId(id);

  return (
    <S.Wrapper>
      <S.StyledLink to="/home">Назад</S.StyledLink>
      <S.InfoBlock>
        {isLoading ? (
          <p>Загрузка</p>
        ) : (
          <>
          <S.Title>О вас</S.Title>
            <S.Text>Добрый день, {userData?.data.login}</S.Text>
            <S.Text>Возраст: {userData?.data.age}</S.Text>
            <S.Text>Баланс: {userData?.data.balance}</S.Text>
          </>
        )}
      </S.InfoBlock>
      <S.InfoBlock>
        {isClothesLoading ? (
          <p>Загрузка</p>
        ) : (
          <>
            <S.Title>Доступные предметы одежды:</S.Title>
            {clothesData?.data?.map(clothes => <S.Text key={clothes.id}>{clothes.name}</S.Text>)}
          </>
        )}
      </S.InfoBlock>
      <S.InfoBlock>
        {isLocationsLoading ? (
          <p>Загрузка</p>
        ) : (
          <>
            <S.Title>Доступные локации:</S.Title>
            {locationsData?.data?.map(location => <S.Text key={location.id}>{location.name}</S.Text>)}
          </>
        )}
      </S.InfoBlock>
    </S.Wrapper>
  );
};
