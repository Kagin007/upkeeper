const PropertyPanel = props => {
  const { appointments } = props;
  const numOfBookings = appointments.length;

  if (numOfBookings > 0) {
    return (
      <div className="reservations__property-panel">
        <h1>{appointments[0]["property_id"].address}</h1>
        <h2>
          {appointments[0]["property_id"].city}
          {", "}
          {appointments[0]["property_id"].country}
        </h2>
        <ul>
          {appointments.map((appointment, i) => (
            <li key={i}>
              {" "}
              <figure className="user-xsm">
                <a href="#">
                  <img
                    className="user-photo"
                    src={appointment.member_id.user.imgurl}
                    alt="user_photo"
                  />
                </a>
              </figure>
              {`${
                appointment.member_id.user.first_name +
                " " +
                appointment.member_id.user.last_name
              }-${appointment["booking_date"]}`}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
};

export default PropertyPanel;
