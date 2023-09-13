import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { common } from "./common.js";

let axiosDefaultsHeaders = function (token) {
  if (token) {
    debugger;
    localStorage.setItem("x-jwt-token", token);
    axios.defaults.headers.common["x-jwt-token"] = token;
  } else if (localStorage.getItem("x-jwt-token")) {
    axios.defaults.headers.common["x-jwt-token"] =
      localStorage.getItem("x-jwt-token");
  }
};
axiosDefaultsHeaders();

function App() {
  const onClick = () => {
    const user = {
      name: "홍길동",
      age: 20,
    };
    axios
      .post("http://localhost:3100/api/v1/users/login", user)
      .then(function (response) {
        debugger;
        axiosDefaultsHeaders(response.data.token);
        // TODO: 로그인 구현
        // Store의 state값 수정 (token: localStorage.getItem('x-jwt-token'))
      });
  };

  const onCheckLogin = async () => {
    try {
      await axios.get("http://localhost:3100/api/v1/users/login");
    } catch (error) {
      common.errorCheck(error);
    }
  };

  const onLogout = () => {
    axios.defaults.headers.common["x-jwt-token"] = null;
    localStorage.removeItem("x-jwt-token");
    window.location.href = "/login";
  };

  return (
    <div>
      <button onClick={onClick}>Login</button>
      <button onClick={onCheckLogin}>Check</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default App;
