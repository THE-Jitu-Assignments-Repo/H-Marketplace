import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../config/firebase.config";
import Spinner from "../component/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination]);

function Listing() {
  const [listing, setListing] = useState('');
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const docRef = doc(db, "listings", params.listingId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setListing(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareLinkCopied(true);
    setTimeout(() => {
      setShareLinkCopied(false);
    }, 2000);
  };

  if (loading) {
    return <Spinner />;
  }

  if (!listing) {
    return <div>No listing found.</div>;
  }

  const {
    imgUrls,
    name,
    offer,
    discountedPrice,
    regularPrice,
    location,
    type,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    geolocation,
    userRef,
  } = listing;

  return (
    <main>
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        className="swiper-container"
      >
        {imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="swiperSlideDiv"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

      <div className="listingDetails">
        <p className="listingName">
          {name} - $
          {offer
            ? discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {type === "rent" ? "Rent" : "Sale"}
        </p>
        {offer && (
          <p className="discountedPrice">
            ${regularPrice - discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {bedrooms > 1
              ? `${bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li>
            {bathrooms > 1
              ? `${bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{parking && "Parking Spot"}</li>
          <li>{furnished && "Furnished"}</li>
        </ul>

        <p className="listingLocationTitle">Location</p>
        {/* map */}
        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[geolocation.lat, geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[geolocation.lat,geolocation.lng]}
            >
              <Popup>{location}</Popup>
            </Marker>
          </MapContainer>
        </div>
        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${userRef}?listingName=${name}`}
            className="primaryButton"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
