export const frontendURL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_FRONTEND_URL
    : process.env.DEV_FRONTEND_URL;

export const databaseURL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_DATABASE_URL
    : process.env.DEV_DATABASE_URL;
