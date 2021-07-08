import React from 'react';
import styled from 'styled-components';
import '../styles/homepage.css'

const TT = styled.div`
white-space: pre-line;
height: 100%;
margin: 0px;
`


const Homepage = () => {
  return (
    <TT>
        <div class="homepage">
          <div class="leftside">
            <h1>Logic Nerve</h1>
            <div class="button-panel">
              <div class="login">
                <p>Returning user?</p>
                <a href={"/login"} class="button">LOG IN</a>
              </div>
              <div class="signup">
                <p>New to Logic Nerve?</p>
                <a href={"/signup"} class="button">SIGN UP</a>
              </div>
            </div>
          </div>
          <div class="rightside">
            <img src="/logo-no-text-no-background.png"/>
          </div>
        </div>
    </TT>
  );
};

export default Homepage;