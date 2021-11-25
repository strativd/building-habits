import React from 'react';
import { Input } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import DestroyButton from './DestroyButton';
import EmojiPicker from './EmojiPicker';
import { useHabits } from './useHabits';

const EditBox = styled.div`
  display: grid;
  grid-template-columns: 40px auto 40px;
  grid-gap: 10px;
  align-items: stretch;
  padding: 10px;
  height: 100%;
  cursor: pointer;

  .wrapper {
    margin: auto 0;
    width: 100%;

    p { margin: 0; }
  }
`;

const InputFlex = styled.div`
  display: flex;
  gap: 0.5rem;

  .input-title {
    flex: 2;
  }

  .input-goal {
    flex: 1;

    input {
      text-align: center;
    }
  }
`;

const HabitTitle = styled.p`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid transparent;
  transition: border 150ms ease-in-out;

  :hover {
    border-bottom: 1px solid #75b748;
  }

  span { opacity: 0.5 }
`;

const EditableCell = ({
  habit,
}) => {
  const {
    editingHabit, editing, editHabit, startEditing,
  } = useHabits();

  const changeGoal = (diff) => {
    const newGoal = editingHabit.goal + diff;
    if (newGoal > 8 || newGoal < 1) return;
    editHabit('goal', newGoal);
  };

  const changeHabitTitle = (event) => editHabit('title', event.target.value);

  const enableEditing = () => {
    if (!editing(habit)) startEditing(habit);
  };

  const handleKeypress = (event) => {
    if (event.key === 'Enter') {
      // document.querySelector('#action-button').click();
    }
  };

  const handleEnterKey = (event) => {
    event.stopPropagation();
    if (event.key === 'Enter') {
      enableEditing();
    }
  };

  return (
    <EditBox>
      <EmojiPicker habit={habit} />
      <div
        className="wrapper"
        role="button"
        tabIndex={0}
        onClick={() => enableEditing()}
        onKeyPress={(e) => handleEnterKey(e)}
      >
        {editing(habit) ? (
          <InputFlex>
            <Input
              autoFocus
              className="input-title"
              value={editingHabit.title}
              onChange={(e) => changeHabitTitle(e)}
              onKeyPress={(e) => handleKeypress(e)}
            />
            <Input
              value={editingHabit.goal}
              className="input-goal"
              addonBefore={<MinusOutlined onClick={() => changeGoal(-1)} />}
              addonAfter={<PlusOutlined onClick={() => changeGoal(1)} />}
            />
          </InputFlex>
        ) : (
          <HabitTitle>
            <p>{habit.title}</p>
            <span>
              &times;
              {' '}
              {habit.goal}
            </span>
          </HabitTitle>
        )}
      </div>
      <DestroyButton habit={habit} />
    </EditBox>
  );
};

export default EditableCell;
