import { BaseGeneratedListTypes, FieldConfig } from "@keystone-next/types";

import { User } from "./User";
import { Habit } from "./Habit";
import { Progress } from "./Progress";

const readOnly: FieldConfig<BaseGeneratedListTypes> = {
  access: {
    create: false,
    read: true,
    update: false,
  },
  ui: {
    createView: {
      fieldMode: "hidden",
    },
  },
};

export { User, Habit, Progress, readOnly };
