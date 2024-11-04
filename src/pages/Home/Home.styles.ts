import styled from "styled-components";

export const Wrapper = styled.div<{ location: string; }>`
  display: flex;
  flex-direction: column;

  background: url(${({ location }) => location }) no-repeat;
  background-size: contain;
`;

export const Button = styled.button`
  width: fit-content;
  padding: 22px;

  border: 1px solid #9C784A;
  border-radius: 4px;

  position: absolute;
  right: 5%;
  top: 3%;

  cursor: pointer;
  background-color: #FCFAF7;

  &:hover {
    background-color: #fcf5ec;
    transition: all 0.2s ease-in-out;
  }
`;
