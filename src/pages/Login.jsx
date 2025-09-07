import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import handleChange from "../assets/utils/handleChange";

const Login = ({ setIsConnected }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="login">
      <div className="container">
        <h1>Se connecter</h1>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await axios.post(
                "https://site--vinted-backend--mjzb7kybbk2h.code.run/user/login",
                { email: email, password: password }
              );

              Cookie.set("token", response.data.token);
              setIsConnected(response.data.token);

              if (location.state) {
                navigate(location.state.from);
              } else {
                navigate("/");
              }
            } catch (error) {
              console.log(error.response);
            }
          }}
        >
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(event) => {
              handleChange(event, setEmail);
            }}
          />
          <input
            type="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(event) => {
              handleChange(event, setPassword);
            }}
          />

          <button>Se connecter</button>
          <p>Tu n'as pas de compte Vinted ?</p>
          <Link to="/signup">S'inscrire</Link>
        </form>
      </div>
    </main>
  );
};

export default Login;
