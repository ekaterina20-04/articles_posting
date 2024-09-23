import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";

import "./article.css";
const BASE_URL = "http://127.0.0.1:8000";

export default function Article({ match }) {
  const { id } = useParams();
  console.log(id);
  const [article, setArticle] = useState({});
  const user_id = localStorage.getItem("act_id");
  const [commentId, setCommentId] = useState(0);
  const [text, setText] = useState("");
  const article_id = id;
  const [comments, setArticles] = useState({ comments: [] });

  useEffect(() => {
    fetch(BASE_URL + "/article/" + id, {
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ignore_certificate_errors: true,
    })
      .then((response) => response.json())
      .then((data) => setArticle(data));
  }, [id]);

  useEffect(() => {
    fetch(BASE_URL + "/comments/" + id, {
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

  const createComment = async (event) => {
    event.preventDefault();
    const response = await fetch(BASE_URL + "/comment/" + id, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ignore_certificate_errors: true,
      body: JSON.stringify({
        id: commentId,
        text,
        user_id,
        article_id,
      }),
    });

    const data = await response.json();
    console.log(data);
    window.location.reload();
  };
  return (
    <div className="only_one_article">
      <Header />
      <div className="container_info">
        <div className="border_of_article">
          <div className="title_article">
            <p>{article.title}</p>
          </div>
          <div className="articles_text">
            <p>{article.text}</p>
          </div>
          <div className="authors_article">
            <p></p>
          </div>
        </div>
        <div className="comments_main">
          <div className="naming_coms">
            <p>Comments</p>
          </div>
          <div className="many_comments">
            {comments.comments.map((comment) => (
              <div className="border_comments">
                <div className="text_of_cms">
                  <p key={comment.id}>{comment.text}</p>
                </div>
                <div className="cometns_author">
                  <p>{comment.username}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={createComment}>
            <label>
              <p>Напишите комментарий:</p>
            </label>
            <div className="create-comm">
              <textarea
                name="text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                required
              ></textarea>

              <button type="submit">Отправить комментарий</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
