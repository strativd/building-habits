/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Checkbox } from 'antd';

import { GET_INITIAL_PROGRESS, UPDATE_PROGRESS_COUNT } from './graphql';
import { errorMessages } from '../lib';

const HabitBits = ({
  editing,
  editRow,
  habitRecord,
  columnCount,
  date,
}) => {
  const [habitProgress, setHabitProgress] = useState({});

  const [initialProgress] = useMutation(GET_INITIAL_PROGRESS, {
    skip: habitRecord.key === 'new',
    variables: {
      habitId: habitRecord.id,
      date,
    },
    // eslint-disable-next-line no-console
    onError: (res) => console.log(res),
  });

  const [
    updateProgressCount, { updateLoading, updateError },
  ] = useMutation(UPDATE_PROGRESS_COUNT, {
    onError: (res) => errorMessages(res.errors),
  });

  const habitId = habitRecord.id;
  useEffect(async () => {
    if (habitId) {
      const { data } = await initialProgress();
      setHabitProgress(data.initialProgress);
    }
  }, [habitId]);

  const isFirstColumn = columnCount === 1;
  // const count = habitProgress.count || 0;

  const handleClick = (event) => {
    const { count, id } = habitProgress;
    const { checked } = event.target;
    const newCount = checked ? count + 1 : count - 1;

    updateProgressCount({
      variables: {
        id,
        count: newCount,
      },
    });

    setHabitProgress({
      ...habitProgress,
      count: newCount,
    });
  };

  const renderBits = (goal, editMode) => {
    const bits = [];

    for (let i = 0; i < goal; i += 1) {
      bits.push(
        <Checkbox
          key={i}
          checked={editMode || habitProgress.count > i}
          onClick={(e) => handleClick(e)}
        />,
      );
    }

    return bits;
  };

  return editing && isFirstColumn ? (
    <>
      {renderBits(editRow.goal, true)}
    </>
  ) : (
    <>
      {renderBits(habitRecord.goal)}
    </>
  );
};

export default HabitBits;
