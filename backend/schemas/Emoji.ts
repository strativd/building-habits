import { list } from "@keystone-next/keystone/schema";
import { relationship, text } from "@keystone-next/fields";

// import { permissions, rules } from '../access';

export const Emoji = list({
  description: "Habit Emoji",
  ui: {
    listView: {
      initialColumns: ["habit", "native"],
    },
  },
  fields: {
    habit: relationship({
      many: false,
      ref: "Habit.emoji",
    }),
    native: text({
      defaultValue: "✅",
      isRequired: true,
    }),
    name: text({
      defaultValue: "White Heavy Check Mark",
      isRequired: true,
    }),
    emojiId: text({
      defaultValue: "white_check_mark",
      isRequired: true,
    }),
    unified: text({
      defaultValue: "2705",
      isRequired: true,
    }),
  },
});
