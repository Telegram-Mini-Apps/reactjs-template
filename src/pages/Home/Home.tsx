import { useState } from "react";

import { Character } from "@/components/Character";
import { SideMenu } from "@/components/SideMenu";
import { MOCK_CHARACTERS, MOCK_CLOTHES } from "@/mock";

import * as S from './Home.styles';

const allClothes = MOCK_CLOTHES;

export const Home = () => {
  const [activeClothes, setActiveClothes] = useState([MOCK_CLOTHES[0]]);

    return (
        <S.Wrapper>
            <SideMenu />
            <Character photo={MOCK_CHARACTERS[0].photo} clothes={activeClothes}/>
            {/* TODO закинуть в модалку наверное */}
            <S.ButtonsWrapper>
              {allClothes.map(clothes => {
                const activeId = activeClothes.find(active => active.id === clothes.id)?.id;

                const handleClick = () => {
                  if (activeId) {
                    setActiveClothes([
                      ...activeClothes.filter(el => el.id !== activeId)
                    ])
                  } else {
                    setActiveClothes(prev => [
                      ...prev,
                      allClothes.find(el => el.id === clothes.id)!
                    ])
                  }
                }

                return (
                  <S.Button key={clothes.id} onClick={handleClick}>
                    {activeId ? 'Снять ' : 'Надеть '}
                    &quot;
                    {clothes.name}
                    &quot;
                  </S.Button>
                )
              })}
            </S.ButtonsWrapper>
        </S.Wrapper>
    );
};
