import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Cette ligne permet de vous connecter à votre compte Stripe en fournissant votre clef publique
const stripePromise = loadStripe(
  "pk_test_51S2qp7IgP9MyjZACb6p3bvn2lIkWoLwrgZgMYzthOpkCY2dWb63stZe00aES5eTESdPejph4KnWiMNE53T1Ffz3T006KU2J41u"
);

const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state || {};
  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: price * 100,
    // Devise de la transaction
    currency: "eur",
    // On peut customiser l'apparence ici
    appearance: {
      /*...*/
    },
  };
  return (
    // Le composant Elements doit contenir toute notre logique de paiement
    // On lui donner la preuve que nous sommes connectés et les options de paiement
    <Elements stripe={stripePromise} options={options}>
      <div className="payment-form">
        <h1>Article : {title}</h1>
        <p>Total à payer : {price} €</p>
        <CheckoutForm title={title} price={price} />
      </div>
    </Elements>
  );
};

export default Payment;
