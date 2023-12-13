import React, { useEffect } from "react";
import axios from "axios";
import styles from "./Dash.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Update() {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    body: "",
    author: "",
    image: null,
  });
  let [article, setArticle] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/article`
        );
        return setArticle(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    article.map((element) => {
      if (element.id == id) {
        console.log(element);
        setFormData({
          ...formData,
          title: element.title,
          category: element.category,
          body: element.body,
          author: element.author,
          image: element.image,
        });
      }
    });
  }, [article]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "file" ? e.target.files[0] : e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("body", formData.body);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("image", formData.image);
      console.log(formDataToSend);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND}/article/update/${id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Item updated:", response.data);
      alert("Item Updated");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Item not Updated");
    }
  };
  if (!article || article.length === 0) {
    return <div className={styles.loading}>loading...</div>;
  }
  return (
    <main id={styles["siteMain"]}>
      <div className={styles.containerDash}>
        <div
          className={`${styles.boxNav} ${styles.dFlex} ${styles.justifyBewteen}`}
        >
          <div className={styles.filter}>
            <Link to="/">
              <i className="fas fa-angle-double-left"></i> All Article
            </Link>
          </div>
        </div>
        <div className={`${styles.formTitle} ${styles.textCenter}`}>
          <h2 className={styles.textDark}>Update a Article</h2>
          <span className={styles.textLight}>
            Use The below form to update a Article
          </span>
        </div>
        <form id={styles["updateHeritage"]} encType="multipart/form-data">
          <div className={styles.newHeritage}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.textLight}>
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.textLight}>
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="body" className={styles.textLight}>
                Body
              </label>
              <input
                type="text"
                name="body"
                value={formData.body}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="author" className={styles.textLight}>
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.textLight}>
                Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <button
                type="submit"
                className={`${styles.btn} ${styles.textDark} ${styles.update}`}
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Update;
