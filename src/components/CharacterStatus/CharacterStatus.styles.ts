import { Color } from "@/styles";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${Color.DarkBrown};
  border-radius: 4px;
  padding: 8px;

  background: ${Color.FloralWhite};
`;

export const Text = styled.span`
  color: ${Color.Brown};
`;
