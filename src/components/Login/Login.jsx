import React, { createContext, useContext, useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

function Login({ match }) {
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(null);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(BASE_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });

      const data = await response.json();
      console.log("Server response:", data);
      console.log("Вывод айди " + data.id);

      if (data.login && data.id) {
        localStorage.setItem("act_login", login);
        localStorage.setItem("act_id", data.id.toString());
        console.log("Login successful");

        navigate("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  useEffect(() => {
    const storedLogin = localStorage.getItem("act_login");
    console.log(
      "Проверка на изменение логина " + localStorage.getItem("act_login")
    );
    const storedId = localStorage.getItem("act_id");
    console.log("Проверка на изменение айди " + localStorage.getItem("act_id"));
    if (storedLogin && storedId) {
      setId(storedId);
      setLogin(storedLogin);
    }
  }, []);

  const registerClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Вход в систему</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Логин пользователя:
          <input
            type="text"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            className="login-input"
          />
        </label>

        <br />
        <label className="login-label">
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="login-input"
          />
        </label>
        <br />
        <button type="submit" className="login-button">
          Войти
        </button>
        <button onClick={registerClick} className="login-reg">
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
}

export default Login;
