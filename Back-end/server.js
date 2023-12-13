import express from "express";
import dotenv from "dotenv";
import sequelize from "./config.js";
import cors from "cors";
import { articleRouter } from "./routes/Article.routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/images", express.static("images"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use("/article", articleRouter);
try {
  await sequelize.authenticate();
  console.log("Connection established");
} catch (error) {
  console.log("Unable to connect to database");
}

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
