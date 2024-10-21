import { useState } from "react";

import * as S from "./SideMenu.styles";
import { useLocation } from "react-router-dom";

const PATHS_NAMES: { path: string, name: string }[] = [
  {
    path: '/home',
    name: 'Домой'
  },
  {
    path: '/profile',
    name: 'Профиль'
  },
  {
    path: '/shop',
    name: 'Магазин'
  }
];

export const SideMenu = () => {
  const [isShown, setIsShown] = useState(false);
  const location = useLocation();
  
  const links = PATHS_NAMES.filter(el => el.path !== location.pathname);

  return (
    <S.Wrapper>
      <S.Toggle onClick={() => setIsShown((prev) => !prev)} isShown={isShown} >
        {isShown ? '<-' : '->'}
      </S.Toggle>
      <S.Positioner isShown={isShown} >
        <S.Container>
          {links.map(el => (
            <S.Link key={el.path} to={el.path}>{el.name}</S.Link>
          ))}
        </S.Container>
      </S.Positioner>
    </S.Wrapper>
  );
};
