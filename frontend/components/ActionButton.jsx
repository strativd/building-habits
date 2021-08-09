import React from 'react';
import { message, Button } from 'antd';
import { useMutation } from '@apollo/client';

import { useHabitEditor } from './useHabitEditor';
import { CREATE_HABIT, UPDATE_HABIT } from './graphql';
import { errorMessages } from '../lib';

const ActionButton = ({
  loading,
  tableData,
  setTableData,
}) => {
  const { editingHabit, revertEdits, createNewHabit } = useHabitEditor();

  const editingMode = !!editingHabit.key; // check if key exists
  const addingHabit = editingHabit.key === 'new';

  const updateTableData = (habit) => {
    if (habit) {
      let messageText;
      const newHabit = { ...habit, key: habit.id };
      const newData = [...tableData];
      // Get index of habit being saved and check if it exists
      const index = newData.findIndex((record) => newHabit.id === record.id);

      if (index > -1) {
        newData[index] = newHabit;
        messageText = 'updated!';
      } else {
        // Remove editing row and add habit
        const indexLastRow = newData.length - 1;
        newData[indexLastRow] = newHabit;
        messageText = 'saved!';
      }
      // Update state of parent component
      revertEdits();
      setTableData(newData);
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

  if (loading) return null;

  const addHabit = () => {
    const newHabit = createNewHabit();
    setTableData([...tableData, newHabit]);
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
      <Button id="action-button" type="primary" size="large" loading={createLoading} onClick={() => createHabit(newHabitData)}>
        SAVE HABIT
      </Button>
    );
  } if (editingMode) {
    return (
      <Button id="action-button" type="primary" size="large" loading={updateLoading} onClick={() => updateHabit(newHabitData)}>
        SAVE CHANGES
      </Button>
    );
  }
  return (
    <Button id="action-button" type="default" size="large" onClick={() => addHabit()}>
      ADD HABIT
    </Button>
  );
};

export default ActionButton;
