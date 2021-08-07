import React from 'react';
import { message, Popconfirm } from 'antd';
import { CloseCircleFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';

import { DELETE_HABIT } from './graphql';
import { errorMessages } from '../lib';

const DestroyButton = ({
  record,
  editing,
  setEditRow,
  preEdit,
  tableData,
  setTableData,
}) => {
  const deleteHabit = (habit) => {
    if (habit) {
      const newData = [...tableData];
      const index = newData.findIndex((row) => row.id === habit.id);

      newData.splice(index, 1);
      setTableData(newData);
      setEditRow({});
      message.success(`${habit.title} deleted!`);
    }
  };

  const [deleteHabitMutation] = useMutation(DELETE_HABIT, {
    onError: (res) => errorMessages(res.errors),
    onCompleted: (data) => deleteHabit(data.deleteHabit),
  });

  const revertHabit = (habit) => {
    const newData = [...tableData];
    const isNewHabit = habit.key === 'new';

    if (isNewHabit) {
      newData.pop(); // remove editing row
    } else {
      const index = newData.findIndex((row) => row.id === habit.id);
      newData[index] = preEdit; // revert habit data
    }

    setTableData(newData);
    setTimeout(() => {
      // wait for PopConfirm animation to finish
      setEditRow({});
    }, 300);
  };

  return editing ? (
    <Popconfirm
      title="Undo changes?"
      cancelText="Nope"
      okText="Undo!"
      icon={<QuestionCircleOutlined />}
      onConfirm={() => revertHabit(record)}
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
      onConfirm={() => deleteHabitMutation({ variables: { id: record.id } })}
    >
      <CloseCircleFilled />
    </Popconfirm>
  );
};

export default DestroyButton;
