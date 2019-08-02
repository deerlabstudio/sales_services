module.exports = {
  development: {
    username: 'root',
    password: 'admin',
    database: 'koterp',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: true,
  },
  test: {
    username: '',
    password: '',
    database: '',
    host: '',
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
};
