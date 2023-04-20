import React, { useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Spinner from "../component/Spinner";
import { useNavigate } from "react-router-dom";

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
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
    console.log(formData)
  };
  const onMutate = (e) => {
    let boolean = null
    if(e.target.value === 'true'){
      boolean= true
    }

    if(e.target.value === 'false'){
      boolean= false
    }

    // Files
    if(e.target.files){
      setFormData((prev) => ({
        ...prev,
       images: e.target.files
      }))
    }

    // Text/Booleans/Numbers
    if(!e.target.files){
      setFormData((prev) => ({
        ...prev,
        [e.target.id]: boolean ?? e.target.value
      }))
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
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
                  !parking && parking !== null
                    ? "formButtonActive"
                    : "formButton"
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

          <label className="formLabel">Offer</label>
          <div className="formButtons">
            <button
              className={offer ? "formButtonActive" : "formButton"}
              type="button"
              id="offer"
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>

            <button
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
              type="button"
              id="offer"
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label className="formLabel">Regular Prices</label>
          <div className="formPriceDiv">
            <input
              type="number"
              className="formInputSmall"
              id="regularPrice"
              value={regularPrice}
              onChange={onMutate}
              min={50}
              max={750000000}
              required
            />
            {type === "rent" && <p className="formPriceText">$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className="formLabel">Discounted Price</label>
              <input
                type="number"
                className="formInputSmall"
                id="discountedprice"
                value={discountedprice}
                onChange={onMutate}
                min={50}
                max={750000000}
                required
              />
            </>
          )}
          <label className="formLabel">Images</label>
          <p className="imageInfo">
            The first image will be the cover (max 6).
          </p>
          <input
            type="file"
            className="formInputFile"
            id="images"
            onChange={onMutate}
            max={6}
            accept=".jpg, .png, .jpeg"
            multiple
            required
          />
          <button className="primaryButton createListingButton">Create Listing</button>
        </form>
      </main>
    </div>
  );
}

export default CreateListing;
