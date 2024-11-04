import styled from "styled-components";

import {Color} from "@/styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  padding: 16px;

  background-color: ${Color.Linen};

  min-height: 100vh;
`;

export const ItemPhoto = styled.img`
  width: 70%;
`;

export const Title = styled.h1`
  font-size: 32px;
  color: ${Color.DarkBrown};
`;

export const Description = styled.p`
  font-size: 20px;
  color: ${Color.Brown};
`;

export const Price = styled.p`
  font-size: 22px;
  color: ${Color.Clinker};
`;

export const Button = styled.button`
  font-size: 20px;
  width: fit-content;
  padding: 8px 16px;

  border: 1px solid ${Color.Clinker};
  border-radius: 4px;

  cursor: pointer;
  background-color: ${Color.Clinker};
  color: ${Color.FloralWhite};

  &:hover {
    background-color: ${Color.BlackMagic};
    transition: all 0.2s ease-in-out;
  }
`;
