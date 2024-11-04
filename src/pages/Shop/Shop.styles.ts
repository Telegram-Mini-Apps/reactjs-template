import styled from "styled-components";
import { Link } from "react-router-dom";

import { Color } from "@/styles";

export const Wrapper = styled.div`
  padding: 16px;

  background-color: ${Color.Linen};
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

export const Title = styled.h1`
  font-size: 32px;
  color: ${Color.Brown};
`;

