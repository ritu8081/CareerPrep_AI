/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:t8rWV9QYbdRO@ep-steep-snow-a55f5ygq.us-east-2.aws.neon.tech/neondb?sslmode=require',

    }
  };