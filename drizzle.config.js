/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mock_owner:kW24Guihnlsf@ep-purple-pond-a51e3j9w.us-east-2.aws.neon.tech/ai-interview-mock?sslmode=require',
    }
  };