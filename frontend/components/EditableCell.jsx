// TODO:
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { useHabitEditor } from './useHabitEditor';

const EditableCell = ({
  habitRecord,
}) => {
  const {
    editingHabit, editing, editHabit, startEditing,
  } = useHabitEditor();

  const changeGoal = (habit, diff) => {
    const newGoal = habit.goal + diff;
    if (newGoal > 8 || newGoal < 1) return;
    editHabit('goal', newGoal);
  };

  const changeHabitTitle = (event) => editHabit('title', event.target.value);

  const enableEditHabit = (habit) => {
    if (!editing(habitRecord)) startEditing(habit);
  };

  const handleKeypress = (event) => {
    if (event.key === 'Enter') {
      // document.querySelector('#action-button').click();
    }
  };

  const cell = editing(habitRecord) ? (
    <Input
      autoFocus
      value={editingHabit.title}
      addonBefore={<MinusOutlined onClick={() => changeGoal(editingHabit, -1)} />}
      addonAfter={<PlusOutlined onClick={() => changeGoal(editingHabit, 1)} />}
      onChange={(e) => changeHabitTitle(e)}
      onKeyPress={(e) => handleKeypress(e)}
    />
  ) : <p className="habit-title--text">{habitRecord.title}</p>;

  return (
    <div onClick={() => enableEditHabit(habitRecord)}>
      {cell}
    </div>
  );
};

export default EditableCell;
