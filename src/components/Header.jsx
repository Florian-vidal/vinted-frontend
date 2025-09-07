import logo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

const Header = ({
  isConnected,
  setIsConnected,
  title,
  setTitle,
  priceMin,
  priceMax,
  setPriceMin,
  setPriceMax,
}) => {

  const location = useLocation();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Logo Vinted" />
        </Link>
        {location.pathname === "/" ? (
          <>
            <input
              type="search"
              id="header-title"
              placeholder="Rechercher des articles"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <input
              type="number"
              id="priceMin"
              placeholder="Prix minimum"
              value={priceMin}
              onChange={(event) => {
                setPriceMin(event.target.value);
              }}
            />
            <input
              type="number"
              id="priceMax"
              placeholder="Prix maximum"
              value={priceMax}
              onChange={(event) => {
                setPriceMax(event.target.value);
              }}
            />
          </>
        ) : null}

        <div className="right-header">
          {isConnected ? (
            <button
              onClick={() => {
                setIsConnected(false);
                Cookie.remove("token");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button>S'inscrire</button>
              </Link>
              <Link to="/login">
                <button>Se connecter</button>
              </Link>
            </>
          )}
          <Link to="/publish"><button>Vends tes articles</button></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
