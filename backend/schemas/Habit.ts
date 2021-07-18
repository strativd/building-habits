import { list } from "@keystone-next/keystone/schema";
import {
  text,
  relationship,
  integer,
  timestamp,
  select,
} from "@keystone-next/fields";

import { readOnly } from ".";
import convertToSlug from "../lib/convertToSlug";

// import { permissions, rules } from '../access';

export const Habit = list({
  ui: {
    listView: {
      initialColumns: ["title", "iconEmoji", "goal", "frequency", "owner"],
    },
    labelField: "title",
  },
  fields: {
    title: text({ isRequired: true }),
    goal: integer({ isRequired: true }),
    frequency: select({
      options: [
        { label: "Daily", value: "DAILY" },
        { label: "Weekly", value: "WEEKLY" },
        { label: "Monthly", value: "MONTHLY" },
      ],
      defaultValue: "DAILY",
      isRequired: true,
    }),
    iconEmoji: text({ defaultValue: "✅" }),
    iconName: text({ defaultValue: "white check mark in green checkbox" }),
    order: integer(),
    owner: relationship({
      ref: "User.habits",
      many: false,
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
    progress: relationship({
      many: true,
      ref: "Progress.habit",
    }),
    createdAt: timestamp({
      ...readOnly,
      defaultValue: new Date().toISOString(),
    }),
    slug: text({
      ...readOnly,
      isUnique: true,
    }),
  },
  hooks: {
    resolveInput: async ({ resolvedData, operation }) => {
      // Generate Habit.slug when item is created
      if (operation === "create") {
        const slug = `${resolvedData.title}-${
          resolvedData.frequency
        }-${Date.now()}`;
        resolvedData.slug = convertToSlug(slug);
      }
      // We always return resolvedData from the resolveInput hook
      return resolvedData;
    },
    validateInput: async ({ addValidationError, resolvedData }) => {
      const goal = Number(resolvedData.goal);
      if (goal < 1) {
        addValidationError(`Goal must be greater than 0`);
      } else if (goal > 9) {
        addValidationError(`Goal must be less than 10`);
      }
    },
  },
});
