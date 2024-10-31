import { useState } from "react";

import { Character } from "@/components/Character";
import {Clothes} from "@/components/icons";
import {Footer} from "@/components/Footer";
import { MOCK_CHARACTERS, MOCK_CLOTHES, MOCK_LOCATIONS } from "@/mock";

import * as S from './Home.styles';

const allClothes = MOCK_CLOTHES;
const defaultLocation = MOCK_LOCATIONS[0];

export const Home = () => {
  //const [activeClothes, setActiveClothes] = useState([MOCK_CLOTHES[0]]);
  const [location, setLocation] = useState(defaultLocation);

    return (
        <S.Wrapper location={location.photo}>
            {/*<SideMenu />*/}
            <Character photo={MOCK_CHARACTERS[0].photo} />
          <S.Button>
            <Clothes />
          </S.Button>
          {/* TODO закинуть в модалку */}
            {/*<S.ButtonsWrapper>
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
            </S.ButtonsWrapper>*/}
          <Footer />
        </S.Wrapper>
    );
};
