import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 70%;
  min-height: 600px;
  max-height: 800px;

  background-repeat: no-repeat;
`;

export const ClothesItem = styled.img<{ x: number; y: number }>`
  position: absolute;

  width: 300px;
  height: 150px;

  ${({ x, y }) => `
    left: ${x}px;
    top: ${y}px;
  `}

  z-index: 10;
`;

export const Character = styled.img`
  width: 300px;
`;
