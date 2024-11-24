import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: calc(100vh -84px);
  min-height: 600px;
  max-height: 800px;

  background-repeat: no-repeat;
`;

export const ClothesItem = styled.img<{ x: number; y: number }>`
  position: absolute;

  width: 250px;
  height: 100px;

  ${({ x, y }) => `
    // left: ${x}px;
    top: ${y}px;
  `}

  z-index: 10;
`;

export const Character = styled.img`
  width: 170px;
`;
