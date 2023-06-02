import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../config/firebase.config";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Spinner from "./Spinner";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let listingps = [];

      querySnap.forEach((doc) => {
        return listingps.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // console.log(listingps);
      setListings(listingps);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  // if (listings.length === 0) {
  //   return;
  // }

  return listings.length > 0 ? (
    <>
      <p className="exploreHeading">Recommended</p>
      <Swiper
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="swiper-container"
      >
        {listings.map((data, id) => (
          <SwiperSlide
            key={id}
            onClick={() => navigate(`/category/${data.type}/${data.id}`)}
          >
            <div
              className="swiperSlideDiv"
              style={{
                background: `url(${data.imgUrls[0]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            >
              <p className="swiperSlideText">{data.name}</p>
              <p className="swiperSlidePrice">
                $
                {data.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") ??
                  data.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {data.type === "rent" && "/ month"}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  ) : (
    <></>
  );
}

export default Slider;
