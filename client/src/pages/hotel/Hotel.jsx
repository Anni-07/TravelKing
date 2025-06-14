import "./hotel.css";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import React, { useContext } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";

import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve"; // Importing the Reserve component to handle booking
// This component is responsible for displaying the details of a specific hotel

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // Extracting the hotel ID from the URL
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // openModal is not used in this code, but you can use it if you want to open a modal for booking or other purposes

const {data, loading, error} = useFetch(`/hotels/find/${id}`);
const {user} = useContext(AuthContext); // assuming you have an AuthContext to get user data 
const navigate = useNavigate(); // Import useNavigate from react-router-dom if you want to navigate programmatically

const {dates, options} = useContext(SearchContext);
console.log(dates);




const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
function dayDifference(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
}


// const days = dayDifference(dates[0].endDate, dates[0].startDate);
const days = dates[0]?.endDate && dates[0]?.startDate
  ? dayDifference(new Date(dates[0].endDate), new Date(dates[0].startDate))
  : 0;




  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };



  const handleClick = () => { 
    if (user) {
      setOpenModal(true);
      
    }
    else {
      navigate("/login");
    }
    // This function is called when the "Reserve or Book Now!" button is clicked
    // It checks if the user is logged in, and if so, it opens a modal or redirects to a booking page
    // If the user is not logged in, it redirects to the login page


  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {
        loading ? "loading" : 

      ( <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle"> {data.name} </h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ₹{data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>₹{ days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick ={handleClick} >Reserve or Book Now!</button>

              {/* This button will open the booking modal if the user is logged in
              If the user is not logged in, it will redirect to the login page */}
              
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
      )
}
{openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
   {/* The Reserve component is imported and used here to handle the booking process */}
   {/* It will receive the hotelId and a function to close the modal  */}
    </div>
  );
};

export default Hotel;





// So the flow is:
// User clicks "See availability" → goes to /hotels/:id

// React Router loads <Hotel /> component. 
      // <Route path="/hotels/:id" element={<Hotel />} />

// Hotel component grabs the id from URL.

// It fetches the full data of that hotel and displays it.
