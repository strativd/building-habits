<div align="center">
  <img title="haBits logo" alt="haBits logo" width="140px" src="/frontend/public/static/habits_medium.png">
</div>
<div align="center">
  <img title="React.js" alt="React logo" width="60px" src="/assets/logo_react.webp">
  <img title="GraphQL" alt="GraphQL logo" width="60px" src="/assets/logo_graphql.png">
</div>

# ✅ haBits — building habits, bit by bit.

A personal web project to practice React + Next.js + GraphQL + Keystone JS, and good habits...

https://user-images.githubusercontent.com/25858762/147840182-b37616d5-327e-4dff-97f0-ca6768f71d8c.mov


## Getting started

`$ git clone https://github.com/ztratify/building-habits.git` (or similar) to clone the repo locally

`$ cd building-habits` to open the repo once it's downloaded

`$ npm install` **in both** the `/frontend` and `/backend` folders to install dependencies

`$ npm run dev` **in both** the `/frontend` and `/backend` folders to run each of them locally

View frontend (React + Next.js): [http://localhost:1234](http://localhost:1234)

View Backend (Keystone JS): [http://localhost:3000](http://localhost:3000)

*Start building habits!*

## GraphQL

Explore GraphQL Schema using _graphiql_ interface: [http://localhost:3333/graphiql](http://localhost:3333/graphiql)

### Queries

Habits & Steps with custom search, filtering and sort:

```graphql
query habitsAndSteps {
  habits (
    order: CREATED
    search: "WATER"
  ) {
    id
    title
    goal
    period
    slug
    steps (
      order: DATE
      startDate: "2021-11-11"
      endDate: "2021-11-13"
    ) {
      goal
      progress
      isComplete
    }
  }
}
```

### Mutations

Create Habit:

```graphql
mutation createHabit {
  createHabit(input:{
    title: "💦 FILL WATER BOTTLE",
    goal: 3,
    period: "daily"
  }) {
    habit {
      id
      title
      slug
      createdAt
    }
  }
}
```

Update Habit:

```graphql
mutation updateHabit {
  updateHabit(input:{
    id: 11,
    title: "👨‍💻 15 MINUTES OF CODE",
    goal: 3,
  }) {
    habit {
      goal
      title
      period
      slug
      id
    }
  }
}
```

Delete Habit:

```graphql
mutation deleteHabit {
  deleteHabit(input:{
    id: 11
  }) {
    habit {
      id
      slug
    }
  }
}
```

Create Habit Steps (progress):

```graphql
mutation createSteps {
  createSteps(input:{
    habitId: 11,
    date: "2021-11-11",
    progress: 3,
  }) {
    step {
      date
      goal
      progress
      isComplete
      habit {
        title
        goal
      }
    }
  }
}
```

Update Habit Steps (record progress):

```graphql
mutation updateSteps {
  updateSteps(input:{
    habitId: 11,
    date: "2021-11-11",
    progress: 1,
  }) {
    step {
      date
      goal
      progress
      isComplete
      habit {
        title
        goal
      }
    }
  }
}
```
