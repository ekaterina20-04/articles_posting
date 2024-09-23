import React, { useState } from "react";
import Header from "../Header/Header";
import "./createArticle.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

export default function CreateArticle() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const user_id = localStorage.getItem("act_id");
  console.log("Сейчас будет писать статью юзер " + user_id);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(BASE_URL + "/article", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ignore_certificate_errors: true,
      body: JSON.stringify({
        text,
        user_id,
        title,
      }),
    });

    const data = await response.json();
    console.log(data);
    navigate("/");
  };

  return (
    <div className="createarticle">
      <Header />
      <div className="create-article">
        <h1>Создать статью</h1>
        <form onSubmit={handleSubmit}>
          <label>Заголовок:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <br />
          <label>Текст:</label>
          <textarea
            name="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            required
          ></textarea>
          <br />
          <button type="submit">Создать статью</button>
        </form>
      </div>
    </div>
  );
}
