import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { Checkbox } from 'antd';

import { useHabitEditor } from './useHabitEditor';
import { SET_INITIAL_PROGRESS, UPDATE_PROGRESS_COUNT } from './graphql';
import { errorMessages } from '../lib';

const HabitBits = ({
  habitRecord,
  columnCount,
  date,
}) => {
  const wrapper = useRef(null);
  const [habitProgress, setHabitProgress] = useState({});

  const { editingHabit, editing } = useHabitEditor();

  const [initialProgress] = useMutation(SET_INITIAL_PROGRESS, {
    skip: habitRecord.key === 'NEW',
    variables: {
      habitId: habitRecord.id,
      date,
    },
    onError: (res) => console.log(res),
  });

  const [updateProgressCount] = useMutation(UPDATE_PROGRESS_COUNT, {
    onError: (res) => errorMessages(res),
  });

  useEffect(async () => {
    if (habitRecord.id) {
      const { data } = await initialProgress();
      setHabitProgress(data.initialProgress);
    }
  }, [habitRecord.id]);

  const isFirstColumn = columnCount === 1;

  const animateEmoji = (count) => {
    if (!wrapper) return;
    const bits = wrapper.current.querySelectorAll('.progress-animation');
    const lastBit = bits[count - 1];
    if (lastBit) {
      lastBit.classList.remove('float');
      setTimeout(() => {
        lastBit.classList.add('float');
      }, 0);
    }
  };

  const handleClick = (event) => {
    const { count: prevCount, id } = habitProgress;
    const count = event.target.checked ? prevCount + 1 : prevCount - 1;

    updateProgressCount({
      variables: {
        id,
        count,
      },
    });

    setHabitProgress({
      ...habitProgress,
      count,
    });

    if (count > prevCount) animateEmoji(count);
  };

  const renderBits = (goal, editMode) => {
    const bits = [];

    for (let i = 0; i < goal; i += 1) {
      bits.push(
        <span
          key={`HaBit-${i}`}
          className="progress-animation"
          data-emoji={habitRecord.emoji.native}
        >
          <Checkbox
            checked={editMode || habitProgress.count > i}
            onClick={(e) => handleClick(e)}
          />
        </span>,
      );
    }

    return bits;
  };

  return editing(habitRecord) && isFirstColumn ? (
    <>
      {renderBits(editingHabit.goal, true)}
    </>
  ) : (
    <div ref={wrapper}>
      {renderBits(habitRecord.goal)}
    </div>
  );
};

export default HabitBits;
