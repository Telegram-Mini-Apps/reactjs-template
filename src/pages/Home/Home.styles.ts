import styled from "styled-components";

export const Wrapper = styled.div<{ location: string; }>`
  display: flex;
  flex-direction: column;

  background: url(${({ location }) => location }) no-repeat;
  background-size: contain;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Button = styled.button`
  padding: 8px;

  border: none;
  background: var(--tg-theme-button-color)
`;
