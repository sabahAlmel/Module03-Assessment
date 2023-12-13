import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Dash.module.css";

function Add() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    body: "",
    author: "",
    image: null,
  });
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
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("body", formData.body);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/article/add`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Item added");
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Item not added");
    }
  };

  return (
    <main id={styles["siteMain"]}>
      <div className={styles.containerDash}>
        <div
          className={`${styles.boxNav} ${styles.dFlex} ${styles.justifyBewteen}`}
        >
          <div className={styles.filter}>
            <Link to="/">
              <i className="fas fa-angle-double-left"></i> All Articles
            </Link>
          </div>
        </div>
        <div className={`${styles.formTitle} ${styles.textCenter}`}>
          <h2 className={styles.textDark}>New Article</h2>
          <span className={styles.textLight}>
            Use the form below to create a new Article
          </span>
        </div>
        <form id={styles["addHeritage"]} encType="multipart/form-data">
          <div className={styles.newHeritage}>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.textLight}>
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="title"
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
                placeholder="category"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="body" className={styles.textLight}>
                Body
              </label>
              <input type="text" name="body" onChange={handleChange} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="author" className={styles.textLight}>
                Author
              </label>
              <input type="text" name="author" onChange={handleChange} />
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

export default Add;
