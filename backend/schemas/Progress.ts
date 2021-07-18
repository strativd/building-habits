import { list } from "@keystone-next/keystone/schema";
import { relationship, timestamp, integer } from "@keystone-next/fields";

// import { permissions, rules } from '../access';

export const Progress = list({
  label: "Progress",
  description: "Habit progress",
  singular: "Progress",
  plural: "Progress",
  ui: {
    listView: {
      initialColumns: ["habit", "count", "date"],
      initialSort: {
        field: "date",
        direction: "DESC",
      },
    },
    labelField: "habit",
  },
  fields: {
    habit: relationship({
      many: false,
      ref: "Habit.progress",
      isIndexed: true,
    }),
    count: integer({
      defaultValue: 0,
      isRequired: true,
    }),
    date: timestamp({ isRequired: true }),
  },
});
