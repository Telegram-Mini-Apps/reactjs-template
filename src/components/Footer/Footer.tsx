import React from 'react';

import {Home} from "@/components/icons";
import {Shop} from "@/components/icons";
import {Profile} from "@/components/icons";

import * as S from './Footer.styles.ts';

const PATHS_NAMES: { path: string, name: string, icon?: React.ReactNode}[] = [
  {
    path: '/home',
    name: 'Главная',
    icon: <Home width={22} height={22} />
  },
  {
    path: '/shop',
    name: 'Магазин',
    icon: <Shop width={22} height={22} />
  },
  {
    path: '/profile',
    name: 'Профиль',
    icon: <Profile width={22} height={22} />
  },
];

export const Footer = () => {
  return (
    <S.Wrapper>
      <S.Navbar>
        <S.RoutesList>
          {PATHS_NAMES.map((item) => (
            <li key={item.path}>
              <S.StyledLink to={item.path}>
                {item.icon}
                {item.name}
              </S.StyledLink>
            </li>
          ))}
        </S.RoutesList>
      </S.Navbar>
    </S.Wrapper>
  );
};
