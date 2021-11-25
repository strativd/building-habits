import React from 'react';
import { message, Popconfirm } from 'antd';
import { CloseCircleFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { useHabits } from './useHabits';
import { DELETE_HABIT } from './graphql';
import { errorMessages } from '../lib';

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DestroyButton = ({
  habit,
}) => {
  const {
    habits, setHabits, originalHabit, editing, revertEdits,
  } = useHabits();

  const deleteHabit = (habitData) => {
    if (habitData) {
      const newData = [...habits];
      const index = newData.findIndex((row) => row.id === habitData.id);

      newData.splice(index, 1);
      setHabits(newData);
      revertEdits();
      message.success(`DELETED ${habitData.title}`);
    }
  };

  const [deleteHabitMutation] = useMutation(DELETE_HABIT, {
    onError: (res) => errorMessages(res),
    onCompleted: (data) => deleteHabit(data.deleteHabit),
  });

  const revertHabit = () => {
    const newData = [...habits];
    const isNewHabit = habit.key === 'NEW';

    if (isNewHabit) {
      newData.pop(); // remove editing row
    } else {
      const index = newData.findIndex((row) => row.id === habit.id);
      newData[index] = originalHabit; // revert habit data
    }

    setHabits(newData);
    setTimeout(() => {
      // wait for PopConfirm animation to finish
      revertEdits({});
    }, 300);
  };

  return (
    <IconWrapper className="DestroyButton">
      {editing(habit) ? (
        <Popconfirm
          title="UNDO CHANGES?"
          cancelText="NO"
          okText="UNDO"
          icon={<QuestionCircleOutlined />}
          onConfirm={() => revertHabit()}
        >
          <CloseCircleFilled />
        </Popconfirm>
      ) : (
        <Popconfirm
          title="DELETE HABIT?"
          cancelText="NO"
          okText="DELETE"
          okButtonProps={{ danger: true }}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => deleteHabitMutation({ variables: { id: habit.id } })}
        >
          <CloseCircleFilled />
        </Popconfirm>
      )}
    </IconWrapper>
  );
};

export default DestroyButton;
