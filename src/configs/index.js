module.exports = {
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },

  port: process.env.APP_PORT,
  JWT_KEY: process.env.APP_KEY,
  ip: process.env.APP_URI,
};
