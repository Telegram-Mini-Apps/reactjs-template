import React from "react";

import {Clothes} from "@/interfaces";

import * as S from './styles'

interface ClothesListProps {
    clothes: Clothes[];
    activeClothes?: Clothes[];
    onToggleClothes: (id: string | number) => void;
}

export const ClothesList: React.FC<ClothesListProps> = ({ clothes, activeClothes, onToggleClothes }) => {
    return (
        <S.Wrapper>
            {clothes.map((el) => {
                const isActive = activeClothes?.some(clothes => clothes.id === el.id);

                return (
                    <S.Item key={el.id}>
                        <S.ItemPhoto src={el.photo} alt="Фоточка продукта" />
                        <S.ItemText>
                            <S.ItemName>{el.name}</S.ItemName>
                            <S.Button onClick={() => onToggleClothes(el.id)}>
                                {isActive ? "Снять" : "Надеть"}
                            </S.Button>
                        </S.ItemText>
                    </S.Item>
                );
            })}
        </S.Wrapper>
    );
};
