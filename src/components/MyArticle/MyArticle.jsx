import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import React, { useState, useEffect } from "react";

import "./myArticle.css";
const BASE_URL = "http://127.0.0.1:8000";

export default function MyArticle() {
  const act_id = localStorage.getItem("act_id");
  console.log(act_id);
  const [articles, setArticles] = useState({ articles: [] });
  useEffect(() => {
    fetch(BASE_URL + "/user/" + act_id + "/article", {
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ignore_certificate_errors: true,
    })
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error:", error));
  }, [act_id]);

  const ArticleClick = (id) => {
    window.location.href = `/article/${id}`;
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/article/${id}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        ignore_certificate_errors: true,
      });

      if (!response.ok) {
        throw new Error("Не удалось удалить статью");
      }

      setArticles((prevArticles) => ({
        articles: prevArticles.articles.filter((article) => article.id !== id),
      }));

      console.log("Статья успешно удалена");
    } catch (error) {
      console.error("Ошибка при удалении статьи:", error);
    }
  };

  return (
    <div className="myarticle">
      <Header />
      <div className="main_items">
        <div className="container_info">
          <div className="lents_items">
            <p>Мои статьи</p>
          </div>
          <div className="all_articles">
            {articles.articles.map((article) => (
              <div className="one_of_article">
                <div
                  className="delete"
                  onClick={() => handleDelete(article.id)}
                >
                  <p>Удалить</p>
                </div>
                <div
                  className="title_of_article"
                  onClick={() => ArticleClick(article.id)}
                >
                  <p key={article.id}>{article.title}</p>
                </div>
                <div className="author_of_article">
                  <p>{article.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
