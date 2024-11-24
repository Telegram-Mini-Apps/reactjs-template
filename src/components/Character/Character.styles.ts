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

const getClothesSizes = ({ clothes_type_id }: {clothes_type_id: number}) => {
  switch (clothes_type_id) {
    case 1:
      return `
        width: 250px;
        height: 100px;
        z-index: 10;
      `;

    case 2:
      return `
        width: 174px;
        height: 100px;
        z-index: 10;
      `;

    case 3:
      return `
        width: 134px;
        height: 110px;
        z-index: 100;
      `;
  }
}

export const ClothesItem = styled.img<{ x: number; y: number, clothes_type_id: number }>`
  position: absolute;

  ${getClothesSizes}

  ${({ y }) => `
    top: ${y}px;
  `}
`;

export const Character = styled.img`
  width: 170px;
`;
