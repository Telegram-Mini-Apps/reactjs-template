import React from "react";

import { MOCK_CLOTHES } from "@/mock";
import {Clothes} from "@/interfaces";

import { Modal } from "../Modal";

import { ClothesList } from "./ClothesList";
import * as S from './styles';

interface ClothesModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeClothes: Clothes[];
    onToggleClothes: (id: string | number) => void;
}

export const ClothesModal: React.FC<ClothesModalProps> = ({ isOpen, onClose, activeClothes, onToggleClothes }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <S.Wrapper>
                <ClothesList
                    clothes={MOCK_CLOTHES}
                    activeClothes={activeClothes}
                    onToggleClothes={onToggleClothes}
                />
            </S.Wrapper>
        </Modal>
    );
};
