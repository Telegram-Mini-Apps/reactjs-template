import { MOCK_CLOTHES } from "@/mock";

import { Modal } from "../Modal";

import { ClothesList } from "./ClothesList";
import * as S from './styles';

interface Clothes {
    id: string | number;
    photo: string;
    name: string;
    description?: string;
}

interface ClothesModalProps {
    isOpen: boolean;
    onClose: () => void;
    activeClothes: Clothes[];
    onToggleClothes: (id: string | number) => void;
}

export const ClothesModal: React.FC<ClothesModalProps> = ({ isOpen, onClose, activeClothes, onToggleClothes }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <S.ButtonsWrapper>
                <ClothesList
                    clothes={MOCK_CLOTHES}
                    activeClothes={activeClothes}
                    onToggleClothes={onToggleClothes}
                />
            </S.ButtonsWrapper>
        </Modal>
    );
};
