import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cookie from "js-cookie";
import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51S2qp7IgP9MyjZACb6p3bvn2lIkWoLwrgZgMYzthOpkCY2dWb63stZe00aES5eTESdPejph4KnWiMNE53T1Ffz3T006KU2J41u"
);

function App() {


  const options = {
    mode: "payment",
    amount: 4242,
    currency: "eur",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };

  const [isConnected, setIsConnected] = useState(Cookie.get("token") || false);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100000);

  return (
    <Router>
      <Header
        isConnected={isConnected}
        setIsConnected={setIsConnected}
        title={title}
        setTitle={setTitle}
        priceMin={priceMin}
        priceMax={priceMax}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home title={title} priceMin={priceMin} priceMax={priceMax} />
          }
        />
        <Route path="/offers/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<SignUp setIsConnected={setIsConnected} />}
        />
        <Route
          path="/login"
          element={<LogIn setIsConnected={setIsConnected} />}
        />
        <Route path="/publish" element={<Publish />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise} options={options}>
              <Payment />
            </Elements>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}

export default App;
