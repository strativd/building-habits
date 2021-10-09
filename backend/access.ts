import { permissionsList } from "./schemas/permissionFields";
import { ListAccessArgs } from "./types";

/** At it's simplest,
 ** the access control returns a yes or no value
 ** depending on the users session...
 **/

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

const generatedPermissions = (<any>Object).fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
  isAwesome({ session }: ListAccessArgs): boolean {
    return session?.data.name.includes("strat");
  },
};

// Rule based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  isHabitOwner({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    return { habit: { owner: { id: session.itemId } } };
  },
  canManageHabits({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageHabits
    if (permissions.canManageHabits({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { owner: { id: session.itemId } };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // Otherwise they may only update themselves!
    return { id: session.itemId };
  },
};
