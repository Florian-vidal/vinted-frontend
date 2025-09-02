import { useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state || {};

  return (
    <div className="payment-form">
      <h1>Article :  {title}</h1>
      <p>Total à payer : {price} €</p>
      <CheckoutForm title={title} price={price} />
    </div>
  );
};

export default Payment;
