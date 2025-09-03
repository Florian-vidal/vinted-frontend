import { Navigate, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { useState } from "react";
import axios from "axios";

const Publish = () => {
  const navigate = useNavigate();

  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState(null);
  const [errorPrice, setErrorPrice] = useState("");

  const token = Cookie.get("token");

  return token ? (
    <main className="publish">
      <div className="container">
        <h1>Vends tes articles</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("price", price);
            formData.append("color", color);
            formData.append("picture", picture);

            for (var pair of formData.entries()) {
              console.log(pair[0] + ", " + pair[1]);
            }
            try {
              const response = await axios.post(
                "https://site--vinted-backend--mjzb7kybbk2h.code.run/offer/publish",
                formData,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log(response.data);
              navigate("/");
            } catch (error) {
              console.log(error.response);
            }
            //
          }}
        >
          <section>
            <div>
              <label htmlFor="picture" id="picture-label">
                + Ajoute une photo
                {preview && (
                  <img
                    src={preview}
                    alt="Prévisualisation de l'image avant son upload"
                  />
                )}
              </label>
              <input
                type="file"
                id="picture"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                  const objectUrl = URL.createObjectURL(event.target.files[0]);
                  setPreview(objectUrl);
                }}
              />
            </div>
          </section>
          <section>
            <div>
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                id="title"
                placeholder="ex: Chemise Sézanne verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
            </div>
            <div>
              <label htmlFor="description">Décris ton article</label>
              <input
                type="text"
                id="description"
                placeholder="ex: porté quelques fois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                value={description}
              />
            </div>
          </section>
          <section>
            <div>
              <label htmlFor="brand">Marque</label>
              <input
                type="text"
                id="brand"
                placeholder="Sélectionne une marque"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
                value={brand}
              />
            </div>
            <div>
              <label htmlFor="size">Taille</label>
              <input
                type="text"
                id="size"
                placeholder="Sélectionne une taille"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
                value={size}
              />
            </div>
            <div>
              <label htmlFor="color">Couleur</label>
              <input
                type="text"
                id="color"
                placeholder="Sélectionne une couleur"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
                value={color}
              />
            </div>
            <div>
              <label htmlFor="condition">État</label>
              <input
                type="text"
                id="condition"
                placeholder="Sélectionne un état"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
                value={condition}
              />
            </div>
            <div>
              <label htmlFor="city">Lieu</label>
              <input
                type="text"
                id="city"
                placeholder="Sélectionne ta ville"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                value={city}
              />
            </div>
          </section>
          <section>
            <div>
              <label htmlFor="price">Prix</label>
              <input
                type="text"
                id="price"
                className={errorPrice ? "alert" : ""}
                placeholder="0,00 €"
                onChange={(event) => {
                  setPrice(event.target.value);
                  if (isNaN(event.target.value) === true) {
                    setErrorPrice(true);
                  } else {
                    setErrorPrice(false);
                  }
                }}
                value={price}
              />
              {errorPrice && (
                <p className="red"> Le prix n'est pas au bon format</p>
              )}
            </div>
            <input type="checkbox" id="trade" />
            <label htmlFor="trade">{`Je suis intéressé(e) par les échanges`}</label>
          </section>
          <button>Ajouter</button>
        </form>
      </div>
    </main>
  ) : (
    <Navigate to="/login" state={{ from: "/publish" }} />
  );
};

export default Publish;
