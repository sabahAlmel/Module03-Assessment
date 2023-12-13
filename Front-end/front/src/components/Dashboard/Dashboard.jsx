import React, { useEffect, useState } from "react";
import styles from "./Dash.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  let [article, setArticle] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/article`
        );
        setArticle(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  if (!article || article.length === 0) {
    return <div className={styles.loading}>loading...</div>;
  }
  const keys = Object.keys(article[0]);
  return (
    <main id={styles["siteMain"]}>
      <div className={styles.containerDash}>
        <div
          className={`${styles.boxNav} ${styles.dFlex} ${styles.justifyBewteen}`}
        >
          <Link to="/add" className={styles.borderShadow}>
            <span className={styles.textGradient}>
              New Article <i className="fa-solid fa-user"></i>
            </span>
          </Link>
        </div>
        <form action="/" method="POST">
          <table className={styles.table}>
            <thead className={styles.theadDark}>
              <tr>
                {keys.map((element, index) => {
                  return <th key={index}>{element}</th>;
                })}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {article.map((element, index) => {
                return (
                  <tr key={index}>
                    {keys.map((key) =>
                      key !== "image" ? (
                        <td key={key}>{element[key]}</td>
                      ) : (
                        <td key={key}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND}/${element[key]}`}
                            alt=""
                          />
                        </td>
                      )
                    )}
                    <td>
                      <Link
                        to={`/update/${element.id}`}
                        className={`${styles.btn} ${styles.borderShadow} ${styles.update}`}
                      >
                        <span className={styles.textGradient}>
                          <i className="fas fa-pencil-alt"></i>
                        </span>
                      </Link>
                      <a
                        onClick={async () => {
                          let response = await axios.delete(
                            `${process.env.REACT_APP_BACKEND}/article/delete/${element.id}`
                          );
                          console.log("deleted " + response.data);
                          alert("Data is deleted");
                        }}
                        className={`${styles.btn} ${styles.borderShadow} ${styles.delete}`}
                      >
                        <span className={styles.textGradient}>
                          <i className="fas fa-times"></i>
                        </span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </div>
    </main>
  );
}

export default Dashboard;
