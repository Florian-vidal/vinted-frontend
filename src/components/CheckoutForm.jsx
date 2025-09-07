import { useState } from "react";
import axios from "axios";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      const response = await axios.post("https://site--vinted-backend--mjzb7kybbk2h.code.run/payment", {
        amount: Number(price) * 100,
        title,
      });

      const clientSecret = response.data.clientSecret;

      if (!clientSecret) {
        throw new Error("Aucun clientSecret reçu du backend");
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: "https://tedvin-florian-vidal.netlify.app/",
        },
        redirect: "if_required",
      });

      if (error) {
        handleError(error);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        setLoading(false);
        alert("Paiement réussi !");
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="payment-button"><button disabled={!stripe || loading}>
        {loading ? "Processing..." : "Procéder au paiement"}
      </button></div>
      
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
