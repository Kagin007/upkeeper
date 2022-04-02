import ReservationCard from "./ReservationCard";
import PropertyPanel from "./PropertyPanel";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";

const ReservationsList = () => {
  const user = JSON.parse(window.localStorage.getItem("user"));
  const [cleanerReservations, setCleanerReservations] = useState(null);
  const [ownerReservations, setOwnerReservations] = useState(null);

  const changeHandler = e => {
    const role = e.target.value;
    if (!user) {
      alert("Please login to see your reservations.");
    } else {
      axios
        .get(`/api/reservations/${role}/${user.id}`)
        .then(res => {
          if (role === "cleaner") {
            setCleanerReservations(res.data);
            setOwnerReservations(null);
          } else {
            setOwnerReservations(res.data);
            setCleanerReservations(null);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <Fragment>
      <select onChange={changeHandler}>
        <option value=""></option>
        <option value="cleaner">Cleaner</option>
        <option value="owner">Owner</option>
      </select>

      {cleanerReservations && (
        <div>
          {" "}
          {cleanerReservations.map((reservation, i) => {
            return <ReservationCard key={i} {...reservation} />;
          })}
        </div>
      )}
      {ownerReservations &&
        Object.keys(ownerReservations).map((key, i) => (
          <PropertyPanel appointments={ownerReservations[key]} />
        ))}
    </Fragment>
  );
};

export default ReservationsList;
