import Article from "../models/Article.model.js";
import fs from "fs";

function removeImage(image) {
  fs.unlink(image, (err) => {
    if (err) {
      console.log(`we can't delete the image`);
    } else {
      console.log("image deleted");
    }
  });
}

async function getAllArticles(req, res) {
  let getAll = await Article.findAll();
  return res.status(200).json(getAll);
}
async function getOneArticle(req, res) {
  let id = req.params.id;
  try {
    const getOne = await Article.findByPk(id);
    if (getOne) return res.status(200).json(getOne);
    else return res.status(400).json("article not found");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

async function addNewArticle(req, res) {
  const article = req.body;
  let image;
  if (req.file) {
    image = req.file.path;
  } else {
    res.status(400).json("missing image");
  }
  try {
    if (
      !article.title ||
      !article.category ||
      !article.body ||
      !article.author
    ) {
      if (image) {
        removeImage(image);
      }
      return res.status(400).json({ error: "missing required property" });
    } else if (!image) {
      return res.status(400).json({ error: "missing image" });
    } else {
      article.image = image;
      let newArticle = await Article.create({ ...article });
      return res.status(200).json(newArticle);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

async function updateArticle(req, res) {
  const article = req.body;
  article.id = req.params.id;
  let newImage;
  if (req.file) {
    newImage = req.file.path;
  } else {
    res.status(400).json("missing image");
  }
  const found = await Article.findOne({ where: { id: article.id } });
  if (!found) {
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(400).json({ error: "id not found" });
  }
  const oldImage = found.image;

  try {
    if (oldImage !== newImage) {
      article.image = newImage;
      await Article.update({ ...article }, { where: { id: article.id } });

      if (oldImage) {
        removeImage(oldImage);
      }
    }
    return res.status(200).json(article);
  } catch (err) {
    console.error(`could not save tour ${err}`);
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(500).json({ error: "server error" });
  }
}

function deleteArticle(req, res) {
  let id = req.params.id;
  Article.findOne({ where: { id: id } }).then((article) => {
    if (!article) {
      return res.status(404).json({ error: "article not found" });
    } else {
      const image = article.image;
      return article
        .destroy()
        .then(() => {
          removeImage(image);
          console.log("Successfully deleted record.");
          res.status(200).json("deleted");
        })
        .catch((error) => {
          console.error("Failed to delete record : ", error);
          res.status(400).json("not deleted");
        });
    }
  });
}
export {
  getAllArticles,
  getOneArticle,
  addNewArticle,
  updateArticle,
  deleteArticle,
};
