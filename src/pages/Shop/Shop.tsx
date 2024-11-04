import { ProductsList } from "@/components/ProductsList";
import { MOCK_CLOTHES, MOCK_LOCATIONS } from "@/mock";

import * as S from "./Shop.styles";

export const Shop = () => {
  return (
    <div>
      <S.Wrapper>
        <S.StyledLink to="/home">Назад</S.StyledLink>
        <S.Title>Одежда</S.Title>
        <ProductsList products={MOCK_CLOTHES} />
        <br />
        <S.Title>Локации</S.Title>
        <ProductsList products={MOCK_LOCATIONS} />
      </S.Wrapper>
    </div>
  );
};
