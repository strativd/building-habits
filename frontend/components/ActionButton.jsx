import React from 'react';
import { message, Button } from 'antd';
import { useMutation } from '@apollo/client';

import { useHabits } from './useHabits';
import { CREATE_HABIT, UPDATE_HABIT } from './graphql';
import { errorMessages } from '../lib';

const ActionButton = () => {
  const {
    habits, setHabits, editingHabit, revertEdits, createNewHabit,
  } = useHabits();

  const editingMode = !!editingHabit.key; // check if key exists
  const addingHabit = editingHabit.key === 'NEW';

  const updateTableData = (habit) => {
    if (habit) {
      let messageText;
      const newHabit = { ...habit, key: habit.id };
      const newData = [...habits];
      // Get index of habit being saved and check if it exists
      const index = newData.findIndex((record) => newHabit.id === record.id);

      if (index > -1) {
        newData[index] = newHabit;
        messageText = 'UPDATED!';
      } else {
        // Remove editing row and add habit
        const indexLastRow = newData.length - 1;
        newData[indexLastRow] = newHabit;
        messageText = 'SAVED!';
      }
      // Update state of parent component
      revertEdits();
      setHabits(newData);
      message.success(`${habit.title} ${messageText}`);
    }
  };

  const [
    createHabit, { createLoading },
  ] = useMutation(CREATE_HABIT, {
    onError: (res) => errorMessages(res),
    onCompleted: (data) => updateTableData(data.createHabit),
  });

  const [
    updateHabit, { updateLoading },
  ] = useMutation(UPDATE_HABIT, {
    onError: (res) => errorMessages(res),
    onCompleted: (data) => updateTableData(data.updateHabit),
  });

  const addHabit = () => {
    const newHabit = createNewHabit();
    setHabits([...habits, newHabit]);
  };

  const newHabitData = {
    variables: {
      ...editingHabit,
    },
  };

  if (editingMode && addingHabit) {
    // Add new icon for finished state
    newHabitData.variables = {
      ...newHabitData.variables,
    };

    return (
      <Button style={{ width: '100%', height: '100%' }} type="primary" loading={createLoading} onClick={() => createHabit(newHabitData)}>
        SAVE HABIT
      </Button>
    );
  } if (editingMode) {
    return (
      <Button style={{ width: '100%', height: '100%' }} type="primary" loading={updateLoading} onClick={() => updateHabit(newHabitData)}>
        SAVE CHANGES
      </Button>
    );
  }
  return (
    <Button style={{ width: '100%', height: '100%' }} type="default" onClick={() => addHabit()}>
      ADD HABIT
    </Button>
  );
};

export default ActionButton;
