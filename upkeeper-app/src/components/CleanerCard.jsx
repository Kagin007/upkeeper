import Button from "./Button";
import Review from "./Review";
import Star from "./Star";
import { useState } from "react";
import classNames from "classnames";
import InputForm from "./InputForm";
import SelectProperties from "./SelectProperties";
import axios from "axios";
import CSRFToken from "./CSRFtoken";

const CleanerCard = props => {
  const {
    user,
    imgurl,
    pay_rate,
    average_rating,
    rating_count,
    onOpen,
    top_comment,
    properties,
    bookingdate,
    selectedDate,
    toasterFunction,
  } = props;

  const submitHandler = e => {
    e.preventDefault();
    const postUrl = `api/reservations`;
    const reservationPayload = {
      booking_date: e.target.requestedDate.value,
      member_id: e.target.cleanerid.value,
      property_id: e.target.property.value,
    };
    axios
      .post(postUrl, reservationPayload, {
        headers: { "X-CSRFToken": e.target.csrfmiddlewaretoken.value },
      })
      .then(response => {
        toasterFunction(
          `Your Booking has been successfully created for ${e.target.requestedDate.value}`
        );
        console.log(response);
      })
      .catch(function (error) {
        toasterFunction(
          `Unfortunately, there is an issue with completing the booking.`
        );
        console.log(error);
      });
  };
  const [booking, setBooking] = useState(false);
  const clickHandler = () => {
    setBooking(prev => !prev);
  };

  const todayDate = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;
    return today;
  };
  const articleClasses = classNames("cleaner__card__article", {
    "cleaner__card__booking-selected": booking,
  });
  console.log("props:", props);
  return (
    <article className={articleClasses}>
      <div className="cleaner__card cleaner__card__front">
        <div className="cleaner__card__top">
          <header>
            <figure className="user">
              <a href="#">
                <img className="user-photo" src={imgurl} alt="user_photo" />
                <figcaption className="user-caption">
                  {user.first_name}'s Profile
                </figcaption>
              </a>
            </figure>
            <h2>
              {user.first_name} {user.last_name}
            </h2>
          </header>
          <div className="cleaner__card__middle">
            <h5>Top Review</h5>
            {top_comment}
          </div>

          <main>
            <div>
              <h3 className="cleaner__card--payrate">${pay_rate} CAD / hr</h3>
              <p className="cleaner__card--transport">
                <strong>{user.email}</strong>
              </p>
            </div>
            <figure className="cleaner__card--message">
              <i className="fa-solid fa-message"></i> Message
            </figure>
          </main>
        </div>
        <br />
        <footer className="cleaner__card__bottom">
          <a onClick={onOpen}>
            {average_rating.rating__avg}
            <Star size="16px" />({rating_count} reviews)
          </a>
          <Button onClick={clickHandler}>Book Now!</Button>
        </footer>
      </div>
      <div className="cleaner__card cleaner__card__back">
        <header onClick={clickHandler}>
          <i className="fa-solid fa-xmark modal-exit"></i>
        </header>
        <main className="cleaner__card__back__main">
          <div>
            <figure className="user">
              <a href="#">
                <img className="user-photo" src={imgurl} alt="user_photo" />
                <figcaption className="user-caption">
                  {user.first_name}'s Profile
                </figcaption>
              </a>
            </figure>
            <h2>
              {user.first_name} {user.last_name}
            </h2>
          </div>
          <form onSubmit={submitHandler} className="cleaner__card__bookingform">
            <input type="hidden" name="cleanerid" value={props.id} />
            <CSRFToken />
            <SelectProperties properties={properties} dark />
            <InputForm
              name="requestedDate"
              type="date"
              dark
              date={selectedDate || todayDate()}
            />
            <Button onClick={clickHandler}>Confirm Booking</Button>
          </form>
        </main>
      </div>
    </article>
  );
};
export default CleanerCard;
