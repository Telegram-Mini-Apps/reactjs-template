import { useState } from "react";

import { MOCK_CHARACTERS, MOCK_CLOTHES, MOCK_LOCATIONS } from "@/mock";
import { Character } from "@/components/Character";
import { Clothes } from "@/components/icons";
import { Footer } from "@/components/Footer";
import { ClothesModal } from "@/components/ClothesModal";

import * as S from './Home.styles';

const defaultLocation = MOCK_LOCATIONS[0];

export const Home = () => {
  const [activeClothes, setActiveClothes] = useState([MOCK_CLOTHES[0]]);
  const [location, setLocation] = useState(defaultLocation);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleClothes = (clothesId: string | number) => {
    setActiveClothes(prevClothes => {
      const isActive = prevClothes.some(c => c.id === clothesId);

      if (isActive) {
        return prevClothes.filter(c => c.id !== clothesId);
      } else {
        const newClothes = MOCK_CLOTHES.find(c => c.id === clothesId);

        return newClothes ? [...prevClothes, newClothes] : prevClothes;
      }
    });
  };

  return (
    <S.Wrapper location={location.photo}>
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
