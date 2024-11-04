import styled from "styled-components";

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Button = styled.button`
  width: fit-content;
  padding: 22px;

  border: 1px solid #9C784A;
  border-radius: 4px;

  cursor: pointer;
  background-color: #FCFAF7;

  &:hover {
    background-color: #fcf5ec;
    transition: all 0.2s ease-in-out;
  }
`;