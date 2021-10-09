import { checkbox } from "@keystone-next/fields";

export const permissionFields = {
  canManageHabits: checkbox({
    defaultValue: false,
    label: "User can edit anyone's habits",
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: "User can edit other users",
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: "User can edit anyone's permissions",
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
