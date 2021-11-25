import React from 'react';

import HabitsGrid from '../components/HabitsGrid';
import LoginRequired from '../components/LoginRequired';
import { HabitContextProvider } from '../components/useHabits';

const Home = () => (
  <LoginRequired>
    <HabitContextProvider>
      <HabitsGrid />
    </HabitContextProvider>
  </LoginRequired>
);

export default Home;
