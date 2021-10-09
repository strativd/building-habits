import { list } from "@keystone-next/keystone/schema";
import { relationship, text, integer, virtual } from "@keystone-next/fields";

import { readField } from ".";
import { isSignedIn, rules } from "../access";

// import { permissions, rules } from '../access';

export const Progress = list({
  description: "Habit progress",
  access: {
    create: isSignedIn,
    read: rules.isHabitOwner,
    update: rules.isHabitOwner,
    delete: rules.isHabitOwner,
  },
  ui: {
    listView: {
      initialColumns: ["habit", "count", "date"],
      initialSort: {
        field: "date",
        direction: "DESC",
      },
    },
  },
  fields: {
    habit: relationship({
      many: false,
      ref: "Habit.progress",
      isIndexed: true,
    }),
    owner: relationship({
      many: false,
      ref: "User.progress",
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
    count: integer({
      defaultValue: 0,
      isRequired: true,
    }),
    date: text({ isRequired: true }),
    habitId: text({
      ...readField,
    }),
  },
  hooks: {
    validateInput: ({ resolvedData, addValidationError }) => {
      // Check for valid date object
      if (resolvedData.date) {
        const invalidDate = !Date.parse(resolvedData.date);
        if (invalidDate) {
          addValidationError(
            "Date must be in the following format: YYYY-MM-DD"
          );
        }
      }
    },
    resolveInput: async ({ resolvedData, operation }) => {
      if (operation === "create") {
        // Generate habitId when progress is created
        resolvedData.habitId = String(resolvedData.habit);
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
  },
});
