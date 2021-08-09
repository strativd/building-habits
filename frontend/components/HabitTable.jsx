import React, { useState } from 'react';
import { Table } from 'antd';
import { useQuery } from '@apollo/client';

import { useHabitEditor } from './useHabitEditor';
import ActionButton from './ActionButton';
import DestroyButton from './DestroyButton';
import EditableCell from './EditableCell';
import HabitBits from './HabitBits';
import { ALL_HABITS } from './graphql';
import { getDatesThisWeek } from '../lib';
import EmojiPicker from './EmojiPicker';

const datesThisWeek = getDatesThisWeek();

const HabitTable = () => {
  const [tableData, setTableData] = useState([]);

  const { editingHabit, editing } = useHabitEditor();

  const [editRow, setEditRow] = useState({});
  const [preEdit, setPreEdit] = useState({});

  const queryHabitsCompleted = (habits) => {
    const habitList = habits.map((habit) => {
      const habitRecord = { ...habit };

      habitRecord.key = habit.id;
      datesThisWeek.forEach((date) => {
        habitRecord[date.formatFull] = habit.goal;
      });

      return habitRecord;
    });

    setTableData(habitList);
  };

  const { loading, error } = useQuery(ALL_HABITS, {
    onCompleted: (data) => queryHabitsCompleted(data.allHabits),
  });

  // eslint-disable-next-line no-console
  if (error) console.log(`❗ ERROR: ${error}`);

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
            tableData={tableData}
            setTableData={setTableData}
          />
        );
      },
    },
    ...generateColumnHeaders(),
  ];

  return (
    <>
      <Table
        loading={loading || !!error}
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowClassName={(record) => (
          editing(record) ? 'row--editable row--editable__editing' : 'row--editable'
        )}
      />
      <ActionButton
        loading={loading || !!error}
        tableData={tableData}
        setTableData={setTableData}
      />
    </>
  );
};

export default HabitTable;
