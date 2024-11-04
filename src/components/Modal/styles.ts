import styled from "styled-components";

export const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;

  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);

  z-index: 100;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 60px;
  gap: 48px;

  background: #FCFAF7;

  border-radius: 16px;
`;
