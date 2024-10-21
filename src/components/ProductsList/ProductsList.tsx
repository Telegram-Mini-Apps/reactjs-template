import * as S from './ProductsList.styles';

interface Product {
  photo?: string;
  name: string;
  description: string;
}

export const ProductsList = ({products} : {products: Product[]}) => {
  return (
    <S.Wrapper>
      {products.map((p, index) => (
        <S.Item key={index}>
          <S.ItemPhoto src={p.photo} alt='Фоточка продукта' />
          <S.ItemText>
            <S.ItemName>
              {p.name}
            </S.ItemName>
            <S.ItemDescription>
              {p.description}
            </S.ItemDescription>
          </S.ItemText>
        </S.Item>
      ))}
    </S.Wrapper>
  );
};
