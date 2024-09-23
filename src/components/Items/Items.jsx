import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./items.css";
const BASE_URL = "http://127.0.0.1:8000";

export default function Items() {
  const [articles, setArticles] = useState({ articles: [] });
  const [id, setId] = useState();

  useEffect(() => {
    fetch(BASE_URL + "/articles", {
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
  }, []);

  const ArticleClick = (id) => {
    window.location.href = `/article/${id}`;
  };

  return (
    <div className="main_items">
      <Header />
      <div className="container_info">
        <div className="lents_items">
          <p>Лента</p>
        </div>
        <div className="all_articles">
          {articles.articles.map((article) => (
            <div className="one_of_article">
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
  );
}
