import styled from "styled-components";
import {Link} from "react-router-dom";

import {Color} from "@/styles";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const Item = styled.div`
  position: relative;

  width: 100%;

  display: flex;
  justify-content: space-between;
  gap: 8px;

  &:not(:last-child) {
    &::after {
      content: '';

      position: absolute;
      left: 0;
      bottom: -4px;

      height: 1px;
      width: 100%;
      background-color: ${Color.RainyDay};
    }
  }
`;

export const ItemPhoto = styled.img`
  width: 50%;
`;

export const ItemText = styled.div`
  display: flex;
  flex-direction: column;

  width: 50%;
  max-height: 170px;
`;

export const ItemName = styled.h2`
  font-size: 24px;
  margin: 8px 0;

  color: ${Color.Brown};
`;

export const ItemDescription = styled.p`
  margin: 0;
  -webkit-line-clamp: 4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;

  color: ${Color.Brown};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  font-weight: 600;
  color: ${Color.Brown};

  &:hover {
    color: ${Color.DarkBrown};
  }
`;
