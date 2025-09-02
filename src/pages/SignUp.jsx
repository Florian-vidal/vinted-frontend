import { useState } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import handleChange from "../assets/utils/handleChange";

const SignUp = ({ setIsConnected }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  return (
    <main className="signup">
      <div className="container">
        <h1>S'inscrire</h1>

        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();
           
              const response = await axios.post(
                "https://site--vinted-backend--mjzb7kybbk2h.code.run/user/signup",
                {
                  email, 
                  username, 
                  password, 
                  newsletter: true,
                }
              );
              console.log(response.data);
              

              Cookie.set("token", response.data.token);
              setIsConnected(response.data.token);

              navigate("/");
            } catch (error) {
              console.log(error.response); 
            }
          }}
        >
          <input
            type="text"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              handleChange(event, setUsername);
            }}
          />
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
          <input
            type="checkbox"
            value={newsletter}
            onChange={(event) => {
              setNewsletter(event.target.checked);
            }}
          />
          <button>S'inscrire</button>
          <p>Tu as déjà un compte ?</p>
          <Link to="/login">Se connecter</Link>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
