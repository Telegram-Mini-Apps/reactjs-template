import { useParams } from 'react-router-dom';

import { MOCK_CLOTHES, MOCK_LOCATIONS } from "@/mock";

import * as S from './Product.styles';

export const Product = () => {
  const { type, id } = useParams();

  const productsArray = type === 'clothes' ? MOCK_CLOTHES : MOCK_LOCATIONS;

  const product = productsArray.find((item) => String(item.id) === id);

  if (!product) {
    return <div>Не найдено</div>;
  }

  return (
    <S.Wrapper>
      <S.Title>{product.name}</S.Title>
      <S.ItemPhoto src={product.photo} alt={`Фоточка ${product.name}`} />
      <S.Description>{product.description}</S.Description>
      <S.Price>Цена: {product.price}</S.Price>
      <S.Button>Купить!</S.Button>
    </S.Wrapper>
  );
};
