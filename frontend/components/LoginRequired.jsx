import React from 'react';

import useUser from '../lib/useUser';
import Login from './Login';

export default function LoginRequired({ children }) {
  const user = useUser();

  if (!user) return <Login />;

  return children;
}
