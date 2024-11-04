import styled from "styled-components";

export const Wrapper = styled.div`
display: grid;
grid-template-columns: 135px 100px;
`;

export const Item = styled.div``;

export const ItemPhoto = styled.img`
width: 100px;

`;

export const ItemText = styled.div``;

export const ItemName = styled.div``;

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