import styled from "styled-components";
import {Link} from "react-router-dom";

export const Wrapper = styled.footer`
  background-color: #FCFAF7;
  padding: 4px;
`;

export const Navbar = styled.nav`
`;

export const RoutesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  gap: 16px;
  justify-content: space-around;
`;

export const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  font-size: 16px;
  text-decoration: none;
  color: #9C784A;
`;
