import { BaseGeneratedListTypes, FieldConfig } from "@keystone-next/types";

export const readOnlyField: FieldConfig<BaseGeneratedListTypes> = {
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
