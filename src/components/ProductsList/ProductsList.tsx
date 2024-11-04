import * as S from './ProductsList.styles';

interface Product {
  file_name?: string;
  name: string;
  description?: string;
}

export const ProductsList = ({products} : {products: Product[]}) => {
  return (
    <S.Wrapper>
      {products.map((p, index) => (
        <S.Item key={index}>
          <S.ItemPhoto src={p.file_name} alt='Фоточка продукта' />
          <S.ItemText>
            <S.ItemName>
              {p.name}
            </S.ItemName>
            <S.ItemDescription>
              {p?.description}
            </S.ItemDescription>
          </S.ItemText>
        </S.Item>
      ))}
    </S.Wrapper>
  );
};
