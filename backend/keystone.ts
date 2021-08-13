import { createAuth } from "@keystone-next/auth";
import { config, createSchema } from "@keystone-next/keystone/schema";
import "dotenv/config";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";

import { insertSeedData } from "./seed-data";
import { extendGraphqlSchema } from "./mutations";

import { User, Habit, Emoji, Progress } from "./schemas";

const databaseURL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DATABASE_URL
    : process.env.DEV_DATABASE_URL;

const frontendURL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_FRONTEND_URL
    : process.env.DEV_FRONTEND_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
  secure: false,
};

const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // TODO: Add in inital roles here
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [frontendURL],
        credentials: true,
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      // Add data seeding here
      onConnect: async (keystone) => {
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      User,
      Habit,
      Emoji,
      Progress,
    }),
    extendGraphqlSchema,
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: "id name email",
    }),
  })
);
