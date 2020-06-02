import React from 'react';
import styled from 'styled-components';

const MainWrapper = styled.main`
  width:100%;
  @media (min-width: 576px) {
    width: calc(100% - 64px);
    margin-left: 64px;
  }
`;

const Main = ({ children }) => (
  <MainWrapper>
    {children}
  </MainWrapper>
);

export default Main;
