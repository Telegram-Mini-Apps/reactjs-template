import styled from "styled-components";

import {Color} from "@/styles";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 135px 100px;
  gap: 24px 8px;

  max-height: 300px;
  overflow: scroll;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

export const ItemPhoto = styled.img`
  width: 100px;
`;

export const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ItemName = styled.div`
  font-size: 18px;
  color: ${Color.DarkBrown};
`;

export const Button = styled.button`
  width: fit-content;
  padding: 8px 16px;

  border: 1px solid ${Color.Brown};
  border-radius: 4px;

  cursor: pointer;
  background-color: ${Color.Brown};
  color: ${Color.FloralWhite};

  &:hover {
    background-color: ${Color.DarkBrown};
    transition: all 0.2s ease-in-out;
  }
`;
