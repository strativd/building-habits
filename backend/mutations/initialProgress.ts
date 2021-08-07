import { KeystoneContext, SessionStore } from "@keystone-next/types";
import { Session } from "../types";

import { ProgressCreateInput } from "../.keystone/schema-types";

interface InitialProgressInput {
  habitId: string;
  date: string;
}

async function initialProgress(
  _root: any,
  { habitId, date }: InitialProgressInput,
  context: KeystoneContext
): Promise<ProgressCreateInput> {
  // 1. Query the current user and see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error("You must be logged in to do this!");
  }
  // 2. Query the current progress steps for the user
  const progress = await context.lists.Progress.findMany({
    where: {
      owner: { id: sesh.itemId },
      habit: { id: habitId },
      date: date,
    },
    resolveFields: "id",
  });
  // 3. See if the current progress exists...
  const [existingProgress] = progress;
  // 3.A. if so, return it with the required data!
  if (existingProgress) {
    return await context.lists.Progress.findOne({
      where: { id: existingProgress.id },
      resolveFields: "id,count,date",
    });
  }
  // 3.B. if not, create a new progress step!
  return await context.lists.Progress.createOne({
    data: {
      habit: { connect: { id: habitId } },
      owner: { connect: { id: sesh.itemId } },
      count: 0,
      date,
    },
    resolveFields: false,
  });
}

export default initialProgress;
