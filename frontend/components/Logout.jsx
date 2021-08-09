import React from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { SIGNOUT_MUTATION, CURRENT_USER_QUERY } from './graphql/users';

const NormalizedButton = styled.button`
  display: inline-block;
  border: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export default function Logout() {
  const [signOutUser] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <NormalizedButton onClick={() => signOutUser()}>
      LOG OUT ✌️
    </NormalizedButton>
  );
}
