import React, { useEffect } from 'react';
import styled from 'styled-components';

import useUser from './useUser';
import { useHabits } from './useHabits';
import ActionButton from './ActionButton';
import EditableCell from './EditableCell';
import { getDatesThisWeek } from '../lib';
import HabitProgress from './HabitProgress';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 500px repeat(7, 250px);
  grid-template-rows: auto;
  grid-gap: 5px;
  align-items: stretch;
  overflow-x: scroll;
  // + hide scroll bar
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  &::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;
  }

  .GridCell {
    border-radius: 10px;
    height: 60px;
  }

  .Sticky {
    position: sticky;
    left: 0;
    background: #111010;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-radius: 0;
    box-shadow: 8px 0 5px -5px rgba(0,0,0,0.5);
    z-index: 10;
  }
`;

const GridRowWrapper = styled.div`
  display: contents;

  &:hover {
    .GridCell {
      background: #1f1f1f;
    }
  }
`;

const datesThisWeek = getDatesThisWeek();

const HabitsGrid = () => {
  const user = useUser();
  const { habits, setHabits, editing } = useHabits();

  useEffect(() => {
    const userHabits = [];
    user?.habits?.forEach((userHabit) => {
      const habit = { ...userHabit };
      habit.key = habit.id;
      datesThisWeek.forEach((date) => {
        habit[date.formatFull] = habit.goal;
      });
      userHabits.push(habit);
    });
    setHabits(userHabits);
  }, [user]);

  return (
    <Grid>
      <div className="GridCell Sticky" />

      {datesThisWeek.map((date) => (
        <div key={date.formatFull}>
          <div>{date.weekday[0].toUpperCase()}</div>
          <small>{date.formatTiny}</small>
        </div>
      ))}

      {habits.map((habit, rowIndex) => {
        const rowCount = rowIndex + 1;
        const classes = editing(habit)
          ? 'GridRow__editable GridRow__editable--editing'
          : 'GridRow__editable';

        return (
          <GridRowWrapper key={`Row-${rowCount}`} className={`GridRow ${classes}`}>
            <div className="GridCell Sticky">
              <EditableCell habit={habit} />
            </div>

            {datesThisWeek.map((date, index) => {
              const columnCount = index + 1;

              return (
                <div key={`Column-${columnCount}`} className="GridCell">
                  <HabitProgress
                    habit={habit}
                    date={date.formatFull}
                    rowCount={rowCount}
                    columnCount={columnCount}
                  />
                </div>
              );
            })}
          </GridRowWrapper>
        );
      })}

      <div className="GridCell Sticky">
        <ActionButton />
      </div>
    </Grid>
  );
};

export default HabitsGrid;
