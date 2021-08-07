import { gql } from '@apollo/client';

export const ALL_HABITS = gql`
  query habits {
    allHabits (first:100) {
      id
      title
      goal
      frequency
      slug
      emoji {
        id
        native
        name
        emojiId
        unified
      }
    }
  }
`;

export const GET_INITIAL_PROGRESS = gql`
  mutation GET_INITIAL_PROGRESS($habitId: ID! $date: String!) {
    initialProgress(habitId: $habitId, date: $date) {
      id
      count
      date
    }
  }
`;
export const UPDATE_PROGRESS_COUNT = gql`
  mutation UPDATE_PROGRESS_COUNT($id: ID! $count: Int!) {
    updateProgress(
      id: $id
      data: {
        count: $count
      }
    ) {
      id
      count
      habit {
        id
        title
        goal
      }
    }
  }
`;

export const CREATE_HABIT = gql`
  mutation CREATE_HABIT($title: String!, $goal: Int!, $frequency: String!) {
    createHabit(data:{
      title: $title,
      goal: $goal,
      frequency: $frequency
    }) {
      id
      title
      goal
      frequency
      slug
      emoji {
        id
        native
        name
        emojiId
        unified
      }
    }
  }
`;

export const UPDATE_HABIT = gql`
  mutation UPDATE_HABIT($id: ID!, $title: String, $goal: Int, $frequency: String) {
    updateHabit(id: $id, data: {
      title: $title,
      goal: $goal,
      frequency: $frequency,
    }) {
      id
      title
      goal
      frequency
      slug
      emoji {
        id
        native
        name
        emojiId
        unified
      }
    }
  }
`;

export const UPDATE_EMOJI = gql`
  mutation UPDATE_EMOJI($id: ID!, $native: String!, $name: String!, $emojiId: String!, $unified: String!) {
    updateEmoji(id: $id, data: {
      native: $native,
      name: $name,
      emojiId: $emojiId,
      unified: $unified,
    }) {
      id
      native
      name
      emojiId
      unified
    }
  }
`;

export const DELETE_HABIT = gql`
  mutation DELETE_HABIT($id: ID!) {
    deleteHabit(id: $id) {
      id
      title
    }
  }
`;
