import React from 'react';
import { message, Popconfirm } from 'antd';
import { CloseCircleFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import { useHabitEditor } from './useHabitEditor';
import { DELETE_HABIT } from './graphql';
import { errorMessages } from '../lib';

const DestroyButton = ({
  habitRecord,
  habitList,
  setHabitList,
}) => {
  const {
    originalHabit, editing, revertEdits,
  } = useHabitEditor();

  const deleteHabit = (habit) => {
    if (habit) {
      const newData = [...habitList];
      const index = newData.findIndex((row) => row.id === habit.id);

      newData.splice(index, 1);
      setHabitList(newData);
      revertEdits();
      message.success(`Deleted ${habit.title}`);
    }
  };

  const [deleteHabitMutation] = useMutation(DELETE_HABIT, {
    onError: (res) => errorMessages(res),
    onCompleted: (data) => deleteHabit(data.deleteHabit),
  });

  const revertHabit = (habit) => {
    const newData = [...habitList];
    const isNewHabit = habit.key === 'new';

    if (isNewHabit) {
      newData.pop(); // remove editing row
    } else {
      const index = newData.findIndex((row) => row.id === habit.id);
      newData[index] = originalHabit; // revert habit data
    }

    setHabitList(newData);
    setTimeout(() => {
      // wait for PopConfirm animation to finish
      revertEdits({});
    }, 300);
  };

  return editing(habitRecord) ? (
    <Popconfirm
      title="Undo changes?"
      cancelText="Nope"
      okText="Undo!"
      icon={<QuestionCircleOutlined />}
      onConfirm={() => revertHabit(habitRecord)}
    >
      <CloseCircleFilled />
    </Popconfirm>
  ) : (
    <Popconfirm
      title="Delete habit?"
      cancelText="Nope"
      okText="Delete!"
      okButtonProps={{ danger: true }}
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={() => deleteHabitMutation({ variables: { id: habitRecord.id } })}
    >
      <CloseCircleFilled />
    </Popconfirm>
  );
};

export default DestroyButton;
