import React, { useState } from 'react';
import { Table } from 'antd';

import { useHabitEditor } from './useHabitEditor';
import ActionButton from './ActionButton';
import DestroyButton from './DestroyButton';
import EditableCell from './EditableCell';
import HabitBits from './HabitBits';
import { getDatesThisWeek } from '../lib';
import EmojiPicker from './EmojiPicker';
import useUser from '../lib/useUser';

const datesThisWeek = getDatesThisWeek();

const HabitTable = () => {
  const user = useUser();
  const { editing } = useHabitEditor();

  const userHabits = user?.habits?.map((habit) => {
    const habitRecord = { ...habit };

    habitRecord.key = habit.id;
    datesThisWeek.forEach((date) => {
      habitRecord[date.formatFull] = habit.goal;
    });

    return habitRecord;
  });

  const [habitList, setHabitList] = useState(userHabits || []);

  const generateColumnHeaders = () => {
    const daysArray = [];

    const renderHeader = (date) => (
      <>
        <div>{date.weekday[0].toUpperCase()}</div>
        <small>{date.formatTiny}</small>
      </>
    );

    datesThisWeek.forEach((date, index) => daysArray.push({
      title: renderHeader(date),
      dataIndex: date.formatFull,
      width: '10%',
      shouldCellUpdate: (_, prevRecord) => editing(prevRecord) || index === 0,
      displayName: 'HabitBits',
      render: function renderHabitBits(_, record) {
        return (
          <HabitBits
            habitRecord={record}
            columnCount={index + 1}
            date={date.formatFull}
          />
        );
      },
    }));

    return daysArray;
  };

  const columns = [
    {
      title: '',
      dataIndex: 'icon',
      fixed: true,
      className: 'habit-icon',
      render: function renderEmojiPicker(_, record) {
        return (
          <EmojiPicker habitRecord={record} />
        );
      },
    },
    {
      title: '',
      dataIndex: 'title',
      width: '25%',
      fixed: true,
      className: 'habit-title',
      render: function renderEditableCell(_, record) {
        return (
          <EditableCell habitRecord={record} />
        );
      },
    },
    {
      title: '',
      dataIndex: 'update',
      width: '30px',
      fixed: true,
      className: 'habit-delete-undo',
      render: function renderDestroyButton(_, record) {
        return (
          <DestroyButton
            habitRecord={record}
            habitList={habitList}
            setHabitList={setHabitList}
          />
        );
      },
    },
    ...generateColumnHeaders(),
  ];

  return (
    <>
      <Table
        dataSource={habitList}
        columns={columns}
        pagination={false}
        rowClassName={(record) => (
          editing(record) ? 'row--editable row--editable__editing' : 'row--editable'
        )}
      />
      <ActionButton
        habitList={habitList}
        setHabitList={setHabitList}
      />
    </>
  );
};

export default HabitTable;
