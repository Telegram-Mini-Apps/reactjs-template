import {Product} from "@/interfaces";
import {MOCK_CLOTHES} from "@/mock";

import * as S from './ProductsList.styles';

export const ProductsList = ({products} : {products: Product[]}) => {
  return (
    <S.Wrapper>
      {products.map((p) => (
        <S.Item key={p.id}>
          <S.StyledLink to={`/shop/${'clothes'}/${p.id}`}>
          {/* <S.StyledLink to={`/shop/${p?.clothes_type_id ? 'clothes' : 'locations'}/${p.id}`}> */}
          <S.ItemPhoto src={'assets/' + p.file_name} alt="Фоточка продукта" />
            <S.ItemText>
              <S.ItemName>{p.name}</S.ItemName>
            </S.ItemText>
          </S.StyledLink>
        </S.Item>
      ))}
    </S.Wrapper>
  );
};
