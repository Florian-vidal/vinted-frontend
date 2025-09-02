import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--vinted-backend--mjzb7kybbk2h.code.run/offers/" + id
        );
        setData(response.data);
        setisLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <main className="offer-page">
      <div className="container">
        {data.product_image?.secure_url ? (
          <img src={data.product_image.secure_url} alt={data.product_name} />
        ) : data.product_pictures?.length > 0 ? (
          <img
            src={data.product_pictures[0].secure_url}
            alt={data.product_name}
          />
        ) : (
          <img
            src="https://via.placeholder.com/300x400?text=Aucune+image"
            alt="No image"
          />
        )}
        <section className="offer-details">
          <p>{data.product_name}</p>
          <p>{data.product_price + " €"}</p>
          
          <Link
            to="/payment"
            state={{
              title: data.product_name,
              price: data.product_price,
            }}
          >
            <button>Acheter cet article</button>
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Offer;
