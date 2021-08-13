import { list } from "@keystone-next/keystone/schema";
import { text, password, relationship } from "@keystone-next/fields";

export const User = list({
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    habits: relationship({
      many: true,
      ref: "Habit.owner",
    }),
    progress: relationship({
      many: true,
      ref: "Progress.owner",
    }),
  },
});
