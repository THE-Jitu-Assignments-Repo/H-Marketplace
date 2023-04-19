import React, { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "../component/Spinner";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedprice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedprice,
    images,
    latitude,
    longitude,
  } = formData;
  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, useRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onMutate = () => {};

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>

      <main>
        <form onSubmit={onsubmit}>
          <label htmlFor="" className="formLabel">
            Sell / Rent
          </label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type="button"
              className={type === "rent" ? "formButtonActive" : "formButton"}
              id="type"
              value="rent"
              onClick={onMutate}
            >
              Rent
            </button>
          </div>
          <div>
            <label htmlFor="" className="formLabel">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="formInputName"
              onChange={onMutate}
              value={name}
              maxLength={32}
              minLength={10}
              required
            />
          </div>
        </form>
        <div className="formRooms flex">
          <div>
            <label htmlFor="" className="formLabel">
              Bedrooms
            </label>
            <input
              className="formInputSmall"
              type="number"
              id="bedrooms"
              onChange={onMutate}
              value={bedrooms}
              maxLength={1}
              minLength={50}
              required
            />
          </div>

          <div>
            <label htmlFor="" className="formLabel">
              Bathrooms
            </label>
            <input
              className="formInputSmall"
              type="number"
              id="bathrooms"
              onChange={onMutate}
              value={bathrooms}
              maxLength={1}
              minLength={50}
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="" className="formLabel">
            Parking spot
          </label>
          <div className="formButtons">
            <button
              className={parking ? "formButtonActive" : "formButton"}
              type="button"
              id="parking"
              onClick={onMutate}
              value={true}
              min={1}
              max={50}
              required
            >
              {" "}
              Yes
            </button>
            <button
              className={
                !parking && parking !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="parking"
              onClick={onMutate}
              value={false}
              min={1}
              max={50}
              required
            >
              {" "}
              No
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="" className="formLabel">
            Furnished
          </label>
          <div className="formButtons">
            <button
              className={furnished ? "formButtonActive" : "formButton"}
              type="button"
              id="furnished"
              onClick={onMutate}
              value={true}
              min={1}
              max={50}
              required
            >
              {" "}
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type="button"
              id="furnished"
              onClick={onMutate}
              value={false}
              min={1}
              max={50}
              required
            >
              {" "}
              No
            </button>
          </div>
        </div>

        <label className="formLabel">Address</label>
        <textarea
          className="formInputAddress"
          type="text"
          id="address"
          value={address}
          onChange={onMutate}
          required
        />
        {!geolocationEnabled && (
          <div className="formLatLng flex">
            <div>
              <label className="formLabel">Latitude</label>
              <input
                type="number"
                className="formInputSmall"
                id="latitude"
                value={latitude}
                onChange={onMutate}
                required
              />
            </div>
            
             <div>
              <label className="formLabel">Longitude</label>
              <input
                type="number"
                className="formInputSmall"
                id="longitude"
                value={longitude}
                onChange={onMutate}
                required
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CreateListing;
