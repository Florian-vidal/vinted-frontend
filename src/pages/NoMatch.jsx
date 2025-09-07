import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <main>
      Cette page n'existe pas, merci de retourner à{" "}
      <Link to="/">l'Accueil !</Link>
    </main>
  );
};

export default NoMatch;
