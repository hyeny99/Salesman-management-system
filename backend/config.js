const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  port: process.env.SERVER_PORT,
  jwt_secret: process.env.JWT_SECRET,

  mongo_domain: process.env.DB_DOMAIN,
  mongo_port: process.env.DB_PORT,
  mongo_username: process.env.DB_USER,
  mongo_password: process.env.DB_PASSWORD,
  mongo_database: process.env.DB_NAME,

};