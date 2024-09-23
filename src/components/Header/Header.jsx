import React, { useEffect, useState } from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [login, setLogin] = useState(null);
  const [id, setId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogin = localStorage.getItem("act_login");
    const storedId = localStorage.getItem("act_id");

    console.log("Login from storage:", storedLogin);
    console.log("ID from storage:", storedId);

    if (storedLogin) {
      setLogin(storedLogin);
    }
    if (storedId) {
      setId(storedId);
    }
  }, []);

  const handleLoginClick = () => {
    if (login) {
      localStorage.removeItem("act_login");
      localStorage.removeItem("act_id");
      setLogin(null);
      setId(null);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const createArticleClick = () => {
    navigate("/create_article");
  };

  const mainClick = () => {
    navigate("/");
  };

  const myArticleClick = () => {
    if (id) {
      navigate(`/my_article`);
    } else {
      console.log("ID не найден");
    }
  };

  return (
    <div className="all_header">
      <div className="container_info_for_header">
        <div className="btns_header">
          <div className="btns_article">
            <div className="change_btn" onClick={myArticleClick}>
              <p>Мои статьи</p>
            </div>
            <div className="i_want_to_create_article" onClick={mainClick}>
              <p>Лента</p>
            </div>
            <div
              className="i_want_to_create_article"
              onClick={createArticleClick}
            >
              <p>Создать статью</p>
            </div>
          </div>

          <div className="part_of_enter">
            <div className="header_author">
              <p>{login ? `${login}` : "Гость"}</p>
            </div>
            <div className="enter" onClick={handleLoginClick}>
              <p>{login ? "Выход" : "Вход"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
