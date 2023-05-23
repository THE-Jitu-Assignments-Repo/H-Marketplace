import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [landrord, setLandlord] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.landrordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("could not get landlord data");
      }
    };

    getLandlord();
  }, [params.landrordId]);

  const onChange = (e) => {
    e.setMessage(e.target.value);
  };
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>
      {landrord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landrord?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a href={`mailto:${landrord.email}?Subject=${searchParams.get('listingName')}&body=${message}`}>
                <button type="button" className="primaryButton">Send Message</button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
