import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  updateDoc,
  doc,
  collection,
  getDocss,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.config";
import { toast } from "react-toastify";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import { Link } from "react-router-dom";
import ListingItem from "../component/ListingItem";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  useEffect(() => {
    // setUser(auth.currentUser)
    const fetchUserListings = async () => {
      const ListingRef = collection(db, "listings");
      const q = query(
        ListingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocss(q);

      let listing = [];
      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setLoading(false);
      setListings(listing);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // update name

        await updateProfile(auth.currentUser, {
          dispalyName: name,
        });

        //update firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("failed to update user profile details");
    }
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async(listingId)=>{
    if(window.confirm('Are you sure you want to delete?')){
      await deleteDoc(doc(db,'listings', listingId))
      const updatedListing = listings.filter(listing=> listing.id !== listingId)

      setListings(updatedListing)
      toast.success('Successfully delted listing')
    }
  }
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button className="logOut" type="button" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prev) => !prev);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrowright" />
        </Link>
        {!loading && listings?.length > 0 && (
          <>
          <p className="listingText">Your Lisitings</p>
          <ul className="listingsList">
            {listings.map((listing)=>{
              <ListingItem 
              key={listing.id}
              listing={listing.data}
              id={listing.id}
              onDelete={()=> onDelete(listing.id)}
              />
            })}
          </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
