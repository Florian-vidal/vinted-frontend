import axios from "axios";
import { useState, useEffect } from "react";
import OfferCard from "../components/OfferCard";

const Home = ({ title, priceMin, priceMax }) => {
  const [data, setData] = useState({ offers: [] });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (title) {
          filters += `?title=${title}`;
        }
        if (priceMin) {
          if (filters) {
            filters += `&priceMin=${priceMin}`;
          } else {
            filters += `?priceMin=${priceMin}`;
          }
        }
        if (priceMax) {
          if (filters) {
            filters += `&priceMax=${priceMax}`;
          } else {
            filters += `?priceMax=${priceMax}`;
          }
        }
        const response = await axios.get(
          "https://site--vinted-backend--mjzb7kybbk2h.code.run/offers" + filters
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [title, priceMin, priceMax]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main className="home">
      <div className="container">
        {data && data.offers && data.offers.length > 0 ? (
          data.offers.map((offer) => (
            <OfferCard offer={offer} key={offer._id} />
          ))
        ) : (
          <p>Aucune offre trouvée</p>
        )}
      </div>
    </main>
  );
};

export default Home;
