import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  where,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase.config";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";
import ListingItem from "../component/ListingItem";

function Category() {
  const [listings, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get reference
        const listingsRef = collection(db, "listings");

        //create a query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //Execute query
        const querySnap = await getDocs(q);

        const listings = [];

        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
          // console.log(doc)
        });
        // console.log(listings);
        setListing(listings);
        setLoading(false);
      } catch (error) {
        toast.error("could not fetch listings");
        console.log(error);
      }
    };
    fetchListings();
  }, [params.categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings?.map((listing) => (
                <ListingItem
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
                // <h3 key={listing.id}>{listing.data.name}</h3>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
