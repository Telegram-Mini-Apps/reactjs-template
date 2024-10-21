import { useState } from "react";

import * as S from "./SideMenu.styles";

export const SideMenu = () => {
  const [isShown, setIsShown] = useState(false);

  return (
    <S.Wrapper>
      <S.Toggle onClick={() => setIsShown((prev) => !prev)} isShown={isShown} >
        {isShown ? '<-' : '->'}
      </S.Toggle>
      <S.Positioner isShown={isShown} >
        <S.Container>
          <S.Link to="/shop">Shop</S.Link>
          <S.Link to="/shop">Shop</S.Link>
          <S.Link to="/shop">Shop</S.Link>
          <S.Link to="/shop">Shop</S.Link>
          <S.Link to="/shop">Shop</S.Link>
        </S.Container>
      </S.Positioner>
    </S.Wrapper>
  );
};
