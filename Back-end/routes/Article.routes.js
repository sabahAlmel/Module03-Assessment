import express from "express";
import upload from "../middlewares/multer.js";
import {
  getAllArticles,
  getOneArticle,
  deleteArticle,
  addNewArticle,
  updateArticle,
} from "../controllers/Article.controller.js";
const articleRouter = express.Router();
articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getOneArticle);
articleRouter.post("/add", upload.single("image"), addNewArticle);
articleRouter.put("/update/:id", upload.single("image"), updateArticle);
articleRouter.delete("/delete/:id", deleteArticle);
export { articleRouter };
