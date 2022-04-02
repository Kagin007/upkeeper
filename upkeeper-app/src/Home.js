import React, { useState } from "react";
import "./Home.css";
import Navigation from "./components/Navigation";
import SearchForm from "./components/SearchForm";
import CleanersList from "./components/CleanersList";
import Backdrop from "./components/Backddrop";
import ReviewsModal from "./components/ReviewsModal";
import useModal from "./hooks/useReviewsModal";
import Map from "./components/Map";

function Home(props) {
  const { reviewModalOpen, toggleReviewModal } = useModal();
  const { properties, toasterFunction } = props;

  const [cleaners, setCleaners] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="Home">
      <SearchForm
        setCleaners={setCleaners}
        setSelectedDate={setSelectedDate}
        toasterFunction={toasterFunction}
      />
      <Map />
      <CleanersList
        onOpen={toggleReviewModal}
        cleaners={cleaners}
        selectedDate={selectedDate}
        properties={properties}
        toasterFunction={toasterFunction}
      />

      {reviewModalOpen && <Backdrop onClose={toggleReviewModal} />}
      {reviewModalOpen && <ReviewsModal onClose={toggleReviewModal} />}
    </div>
  );
}

export default Home;
