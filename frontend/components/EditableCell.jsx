// TODO:
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

const EditableCell = ({
  editing,
  editRow,
  setEditRow,
  setPreEdit,
  habitRecord,
}) => {
  const setHabitData = (habit, key, value) => {
    const newHabit = { ...habit };
    newHabit[key] = value;
    setEditRow(newHabit);
  };

  const changeGoal = (habit, diff) => {
    const newGoal = habit.goal + diff;
    if (newGoal > 8 || newGoal < 1) return;
    setHabitData(habit, 'goal', newGoal);
  };

  const changeHabitTitle = (event, habit) => setHabitData(habit, 'title', event.target.value);

  const enableEditHabit = (record) => {
    if (!editing) {
      setPreEdit(record);
      setEditRow(record);
    }
  };

  const cell = editing ? (
    <Input
      value={editRow.title}
      addonBefore={<MinusOutlined onClick={() => changeGoal(editRow, -1)} />}
      addonAfter={<PlusOutlined onClick={() => changeGoal(editRow, 1)} />}
      onChange={(e) => changeHabitTitle(e, editRow)}
    />
  ) : <p className="habit-title--text">{habitRecord.title}</p>;

  return (
    <div onClick={() => enableEditHabit(habitRecord)}>
      {cell}
    </div>
  );
};

export default EditableCell;
