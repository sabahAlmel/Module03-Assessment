import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// const sequelize = new Sequelize(
//   process.env.NAME,
//   process.env.USER,
//   process.env.PASS,
//   { host: process.env.HOST, dialect: "mysql" }
// );
const sequelize = new Sequelize("test_fintech", "sabah12", "sabah@db12", {
  host: "db4free.net",
  dialect: "mysql",
});

export default sequelize;
