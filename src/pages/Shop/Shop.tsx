import { ProductsList } from "@/components/ProductsList";
import { Link } from "@/components/Link";
import { MOCK_CLOTHES, MOCK_LOCATIONS } from "@/mock";

import * as S from "./Shop.styles";

export const Shop = () => {
  return (
    <div>
      <S.Wrapper>
        <Link to="/home">Назад</Link>
        <h1>Одежда</h1>
        <ProductsList products={MOCK_CLOTHES} />
        <br />
        <h1>Локации</h1>
        <ProductsList products={MOCK_LOCATIONS} />
      </S.Wrapper>
    </div>
  );
};
