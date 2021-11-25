import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useHabits } from './useHabits';
import { SET_INITIAL_PROGRESS, UPDATE_PROGRESS_COUNT } from './graphql';
import { errorMessages } from '../lib';
import {
  ProgressBox, ProgressBar, ButtonBox, ProgressButton, ProgressCount,
} from './styles';

function hslColor(multiplier) {
  const hue = 92;
  const saturation = 88;
  const lightness = 66;
  return `hsl(${hue * multiplier}, ${saturation}%, ${lightness}%)`;
}

const HabitProgress = ({
  date,
  habit,
  columnCount,
  rowCount,
}) => {
  const [habitProgress, setHabitProgress] = useState({});
  const [fetchError, setFetchError] = useState(false);

  const { editing } = useHabits();

  const [initialProgress] = useMutation(SET_INITIAL_PROGRESS, {
    skip: habit.key === 'NEW',
    variables: {
      habitId: habit.id,
      date,
    },
    onError: (res) => console.log(res),
  });

  const [updateProgressCount] = useMutation(UPDATE_PROGRESS_COUNT, {
    onError: (res) => errorMessages(res),
  });

  useEffect(async () => {
    if (habit.id) {
      const { data } = await initialProgress();
      if (!data || !data.initialProgress) {
        setFetchError(true);
      } else {
        setHabitProgress(data.initialProgress);
      }
    }
  }, [habit.id]);

  const isEditing = editing(habit);
  const progressCount = habitProgress.count;
  const minProgress = progressCount <= 0;
  const maxProgress = progressCount >= habit.goal;

  let multiplier = progressCount / habit.goal;
  if (minProgress) multiplier = 0;
  if (maxProgress) multiplier = 1;

  const percentage = multiplier * 100;
  const showCount = !minProgress && !maxProgress;

  const updateProgress = (diff) => {
    const { count, id } = habitProgress;
    const progress = count + diff;

    updateProgressCount({
      variables: {
        id,
        count: progress,
      },
    });

    setHabitProgress({
      ...habitProgress,
      count: progress,
    });
  };

  return (
    <ProgressBox
      className={maxProgress ? 'completed' : undefined}
      column={columnCount}
      row={rowCount}
    >
      <ProgressBar
        style={{
          flexBasis: `${percentage}%`,
          background: hslColor(multiplier),
        }}
      />
      <ButtonBox>
        {showCount && (
        <ProgressCount>
          {progressCount}
        </ProgressCount>
        )}
        <ProgressButton
          ghost
          disabled={minProgress || isEditing}
          style={{ borderRadius: '10px 0 0 10px' }}
          onClick={() => updateProgress(-1)}
        >
          –
        </ProgressButton>
        <ProgressButton
          ghost
          disabled={maxProgress || isEditing}
          style={{ borderRadius: '0 10px 10px 0' }}
          onClick={() => updateProgress(1)}
        >
          +
        </ProgressButton>
      </ButtonBox>
    </ProgressBox>
  );
};

export default HabitProgress;
