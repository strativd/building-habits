import { list } from "@keystone-next/keystone/schema";
import {
  text,
  relationship,
  integer,
  timestamp,
  select,
} from "@keystone-next/fields";

import { readField, hiddenField } from ".";
import { isSignedIn, rules } from "../access";
import convertToSlug from "../lib/convertToSlug";

export const Habit = list({
  access: {
    create: isSignedIn,
    read: rules.canManageHabits,
    update: rules.canManageHabits,
    delete: rules.canManageHabits,
  },
  ui: {
    listView: {
      initialColumns: ["title", "goal", "frequency", "owner"],
    },
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
    order: integer({
      /*
      isRequired: true,
      isUnique: true,
      */
    }),
    emoji: relationship({
      ref: "Emoji.habit",
      many: false,
    }),
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
      ...hiddenField,
    }),
    createdAt: timestamp({
      ...readField,
      defaultValue: new Date().toISOString(),
    }),
    slug: text({
      ...readField,
      isUnique: true,
    }),
  },
  hooks: {
    resolveInput: async ({ resolvedData, operation, context }) => {
      if (operation === "create") {
        // Generate Habit.slug when item is created
        resolvedData.slug = convertToSlug(
          `${resolvedData.title}-${resolvedData.frequency}-${Date.now()}`
        );
        // Generate new Habit.emoji if one isn't provided
        if (!resolvedData.emoji) {
          const emoji = await context.lists.Emoji.createOne({ data: {} });
          resolvedData.emoji = emoji.id;
        }
        // Generate Habit order based on user's habit count
        /* TODO: deleted habits are not accounted for...
        const count = await context.lists.Habit.count({
          where: { owner: { id: context.session.itemId } },
        });
        resolvedData.order = count + 1;
        */
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
    afterDelete: async ({ context, existingItem }) => {
      // Delete emoji from db
      const emojiId = String(existingItem.emoji);
      await context.lists.Emoji.deleteOne({ id: emojiId });
      // Delete progress steps from db
      const habitId = String(existingItem.id);
      const progress = await context.lists.Progress.findMany({
        where: { habitId },
        resolveFields: "id",
      });
      const ids = progress.map((item) => item.id);
      await context.lists.Progress.deleteMany({ ids });
    },
  },
});
