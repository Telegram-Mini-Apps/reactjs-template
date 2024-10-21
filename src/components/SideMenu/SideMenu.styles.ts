import styled from "styled-components";

import { Link as BaseLink } from "../Link";

export const Wrapper = styled.div`
  position: relative;
  z-index: 100;
`;

export const Positioner = styled.div<{ isShown: boolean }>`
  position: absolute;
  left: 0;
  top: 64px;

  background: var(--tg-theme-section-bg-color);

  transform: ${({ isShown }) =>
    !isShown &&
    `
    translateX(-100%)
  `};

  transition: all 0.2s;

  border-radius: 0 8px 8px 0;
`;

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Toggle = styled.button<{ isShown: boolean }>`
  position: absolute;

  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 64px;
  height: 64px;

  background: var(--tg-theme-section-bg-color);
  color: white;

  border: none;
  border-radius: ${({ isShown }) => isShown ? '0 8px 0 0' : '0 8px 8px 0;'};

  transition: all 0.2s;
`;

export const Link = styled(BaseLink)`
  padding: 12px 20px;

  font-size: 24px;
`;
