import React from 'react';
import { message, Button } from 'antd';
import { useMutation } from '@apollo/client';

import { CREATE_HABIT, UPDATE_HABIT } from './graphql';
import { errorMessages } from '../lib';

const ActionButton = ({
  loading,
  editRow,
  setEditRow,
  setPreEdit,
  tableData,
  setTableData,
}) => {
  const editingMode = !!editRow.key; // check if key exists
  const addingHabit = editRow.key === 'new';

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
      setTableData(newData);
      setPreEdit({});
      setEditRow({});
      message.success(`${habit.title} ${messageText}`);
    }
  };

  const [
    createHabit, { createLoading },
  ] = useMutation(CREATE_HABIT, {
    onError: (res) => errorMessages(res.error),
    onCompleted: (data) => updateTableData(data.createHabit),
  });

  const [
    updateHabit, { updateLoading },
  ] = useMutation(UPDATE_HABIT, {
    onError: (res) => errorMessages(res.error),
    onCompleted: (data) => updateTableData(data.updateHabit),
  });

  if (loading) return null;

  const addNewHabit = () => {
    const newHabit = {
      key: 'new',
      title: '',
      goal: 1,
      frequency: 'daily',
      emoji: {
        native: '👉',
        name: 'hand pointing to the right',
      },
    };

    setPreEdit(newHabit);
    setEditRow(newHabit);
    setTableData([...tableData, newHabit]);
  };

  const newHabitData = {
    variables: {
      ...editRow,
    },
  };

  if (editingMode && addingHabit) {
    // Add new icon for finished state
    newHabitData.variables = {
      ...newHabitData.variables,
    };

    return (
      <Button id="action-button" type="primary" loading={createLoading} onClick={() => createHabit(newHabitData)}>
        SAVE HABIT
      </Button>
    );
  } if (editingMode) {
    return (
      <Button id="action-button" type="primary" loading={updateLoading} onClick={() => updateHabit(newHabitData)}>
        SAVE CHANGES
      </Button>
    );
  }
  return (
    <Button id="action-button" type="primary" onClick={() => addNewHabit()}>
      ADD HABIT
    </Button>
  );
};

export default ActionButton;
