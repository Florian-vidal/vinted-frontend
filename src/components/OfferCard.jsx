import { Link } from "react-router-dom";

const OfferCard = ({ offer }) => {
  return (
    <article className="home-offer-details">
      <div className="owner-details">
        <p>{offer.owner?.account?.username}</p>
      </div>
      <Link to={"/offers/" + offer._id}>
        <img
          className="product-image"
          src={offer.product_image.secure_url}
          alt="offer view"
        />
        <p>{offer.product_price + " €"}</p>

        {offer.product_details.map((element, index) => {
          return (
            element["TAILLE"] && (
              <p key={element.TAILLE + index}>{element.TAILLE}</p>
            )
          );
        })}

        {offer.product_details.map((element, index) => {
          // console.log(element);
          return (
            element["MARQUE"] && (
              <p key={element.MARQUE + index}>{element.MARQUE}</p>
            )
          );
        })}
      </Link>
    </article>
  );
};

export default OfferCard;
