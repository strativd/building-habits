import React, { createContext, useContext, useState } from 'react';

const HabitContext = createContext();
const HabitProvider = HabitContext.Provider;

function HabitContextProvider({ children }) {
  /* This is our own custom provider!
   * We will store data (state) and functionality (updaters)
   * in here and anyone can access it via the consumer 🎉
   */

  const [habits, setHabits] = useState([]);
  const [editingHabit, setEditingHabit] = useState({});
  const [originalHabit, setOriginalHabit] = useState({});

  const startEditing = (habit) => {
    setEditingHabit(habit);
    setOriginalHabit(habit);
  };

  const editHabit = (key, value, habit = originalHabit) => {
    setOriginalHabit(habit);
    const habitData = { ...editingHabit };
    habitData[key] = value;
    setEditingHabit(habitData);
  };

  const editing = (habit) => habit?.key === editingHabit?.key;

  const createNewHabit = () => {
    const habit = {
      key: 'NEW',
      title: '',
      goal: 1,
      frequency: 'DAILY',
      emoji: {
        native: '👉',
        name: 'hand pointing to the right',
      },
    };
    setEditingHabit(habit);
    setOriginalHabit(habit);
    return habit;
  };

  const revertEdits = () => {
    const habit = { ...originalHabit };
    setEditingHabit({});
    setOriginalHabit({});
    return habit;
  };

  return (
    <HabitProvider
      value={{
        habits,
        editingHabit,
        originalHabit,
        setHabits,
        startEditing,
        editHabit,
        editing,
        createNewHabit,
        revertEdits,
      }}
    >
      {children}
    </HabitProvider>
  );
}

// make a custom hook for accessing the habit local state
function useHabits() {
  // we use a consumer here to access the local state in our hook
  const habitContext = useContext(HabitContext);

  return habitContext;
}

export { HabitContextProvider, useHabits };
