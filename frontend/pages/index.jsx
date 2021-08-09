import React from 'react';

import HabitTable from '../components/HabitTable';
import LoginRequired from '../components/LoginRequired';
import { HabitContextProvider } from '../components/useHabitEditor';

const Home = () => (
  <LoginRequired>
    <HabitContextProvider>
      <HabitTable />
    </HabitContextProvider>
  </LoginRequired>
);

export default Home;
