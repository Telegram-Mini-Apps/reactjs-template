import React from 'react';
import { createPortal } from 'react-dom';

import * as S from './styles'

interface IModal {
    onClose: () => void;
    isOpen: boolean;
    children: React.ReactNode;
}

export const Modal: React.FC<IModal> = ({ isOpen, onClose, children }) => {
    const modalRoot = document.getElementById('modalRoot');

    if (!isOpen || !modalRoot) return null;

    return createPortal(
        <S.Overlay onClick={onClose}>
            <S.Block onClick={(e) => e.stopPropagation()}>{children}</S.Block>
        </S.Overlay>,
        modalRoot,
    );
};
