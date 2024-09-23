import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

function Registration() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [userId, setUserId] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(BASE_URL + "/user", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ignore_certificate_errors: true,
      body: JSON.stringify({
        id: userId,
        name,
        email,
        login,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
    navigate("/login");
  };
  return (
    <div className="login-container">
      <h1 className="login-title">Регистрация</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Введите имя:
          <input
            type="text"
            className="login-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="login-label">
          Введите почту:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="login-input"
          />
        </label>
        <label className="login-label">
          Придумайте логин:
          <input
            type="text"
            className="login-input"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
        </label>
        <br />
        <label className="login-label">
          Придумайте пароль:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="login-input"
          />
        </label>
        <br />
        <button type="submit" className="login-button">
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
}

export default Registration;
