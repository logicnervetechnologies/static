import React from 'react';
import styled from 'styled-components';

const TT = styled.div`
white-space: pre-line;
height: 100%;
`


const Homepage = () => {
  return (
    <TT>
        <div id="page">
          <h1>Logic Nerve</h1>
          <p>Please Log In</p>
          <a href={"/login"}>LOG IN</a>
        </div>
    </TT>
  );
};

export default Homepage;