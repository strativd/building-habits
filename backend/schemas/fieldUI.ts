import { BaseGeneratedListTypes, FieldConfig } from "@keystone-next/types";

export const readField: FieldConfig<BaseGeneratedListTypes> = {
  ui: {
    itemView: { fieldMode: "read" },
    listView: { fieldMode: "read" },
    createView: { fieldMode: "hidden" },
  },
};

export const hiddenField: FieldConfig<BaseGeneratedListTypes> = {
  ui: {
    itemView: { fieldMode: "hidden" },
    listView: { fieldMode: "hidden" },
    createView: { fieldMode: "hidden" },
  },
};
