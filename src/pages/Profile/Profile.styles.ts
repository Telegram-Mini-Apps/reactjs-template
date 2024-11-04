import styled from "styled-components";

import { Color } from "@/styles";
import { Link } from "@/components/Link";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
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

export const InfoBlock = styled.div`

`;

export const Title = styled.h1`
  font-size: 20px;
  color: ${Color.Brown};
`;

export const Text = styled.p`
  color: ${Color.Brown};
`;
