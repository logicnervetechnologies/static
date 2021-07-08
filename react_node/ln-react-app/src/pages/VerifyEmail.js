import React from 'react';
import styled from 'styled-components';

const TT = styled.div`
white-space: pre-line;
`


const VerifyEmail = () => {
  return (
    <TT>
        <div>
        <h1>Logic Nerve</h1>
        <p>A verification email was sent to your email address. Please verify your email then login.</p>
        <a href={"/login"}>LOG IN</a>
        </div>
    </TT>
  );
};

export default VerifyEmail;