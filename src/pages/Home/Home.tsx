import React, { useEffect, useState } from "react";

import { useCharactersById } from "@/api/user";
import { MOCK_CHARACTERS, MOCK_CLOTHES, MOCK_LOCATIONS } from "@/mock";
import { Character } from "@/components/Character";
import { Clothes } from "@/components/icons";
import { Footer } from "@/components/Footer";
import { ClothesModal } from "@/components/ClothesModal";
import { CharacterStatus } from "@/components/CharacterStatus";
import { HapinessStatuses } from "@/constants/bussiness";
import { getHappinessStatusByPercent } from '@/helpers';

import * as S from './Home.styles';

const defaultLocation = MOCK_LOCATIONS[0];

export const Home = () => {
  const [activeClothes, setActiveClothes] = useState([MOCK_CLOTHES[1],MOCK_CLOTHES[5]]);
  const [location, _] = useState(defaultLocation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: characters } = useCharactersById(1);

  useEffect(() => {
    const happiness = characters?.data?.[0]?.happiness_percent;
    const happinessStatus = happiness && getHappinessStatusByPercent(happiness);

    if (happinessStatus === HapinessStatuses.Bad) {
      alert('Пожалуйста, порадуйте питомца');
    }
  }, [characters]);

  const openModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleClothes = (clothesId: string | number) => {
    setActiveClothes(prevClothes => {
      const isActive = prevClothes.some(c => c.id === clothesId);

      const newClothes = MOCK_CLOTHES.find(c => c.id === clothesId);

      if (!newClothes) return prevClothes;

      if (isActive) {
        return prevClothes.filter(c => c.id !== clothesId);
      } else {
        return [
          ...prevClothes.filter(c => c.clothes_type_id !== newClothes.clothes_type_id),
          newClothes,
        ];
      }
    });
  };

  return (
    <S.Wrapper location={location.photo}>
      <CharacterStatus />
      <Character photo={MOCK_CHARACTERS[0].photo} clothes={activeClothes} />
      <S.Button onClick={openModal}>
        <Clothes />
      </S.Button>
      {isModalOpen && (
        <ClothesModal
          isOpen={isModalOpen}
          onClose={closeModal}
          activeClothes={activeClothes}
          onToggleClothes={toggleClothes}
        />
      )}
      <Footer />
    </S.Wrapper>
  );
};
