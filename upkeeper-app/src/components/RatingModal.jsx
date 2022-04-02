import React, { useState, useContext } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Link,
  Button,
  TextField,
} from "@material-ui/core";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import axios from "axios";
import { authContext } from "../providers/AuthProvider";
import {getCookie} from "./components/CSRFtoken";

const RatingModal = props => {

  const user = JSON.parse(window.localStorage.getItem("user"));

  const avatarStyle = {
    backgroundColor: "#98b4aa",
    width: "100px",
    height: "100px",
  };

  const buttonStyle = {
    margin: "5px 0",
    backgroundColor: "#98b4aa",
    color: "white",
  };

  const iconStyle = {
    fontSize: "50px",
  };

  const companyName = {
    fontFamily: "Julius Sans One",
    justifyContent: "center",
    color: "#495371",
    fontSize: "50px",
  };

  const fieldStyle = {
    margin: "5px auto",
    backgroundColor: "white",
  };

  const [newRating, setNewRating] = useState({
    reservation_id: props.reservation_id,
    member_id: props.cleaner_id,
    message: "",
    rating: "",
  });

  const sendRatingData = () => {
    const token = getCookie("csrftoken")
    axios
      .post(`/api/ratings/${user.id}`, newRating, {
        headers: { "X-CSRFToken": token },
      })
      .then((res) => {
        console.log("Success", res.data);
      })
      .catch((err) => {
        console.log("Failure", err);
      });
  };

  const handleInput = (event) => {
    const newData = { ...newRating };
    newData[event.target.id] = event.target.value;
    setNewRating(newData);
    console.log(newRating);
  };

  return (
    <section className="modal">
      <header className="modal-header">
        <div onClick={props.onClose}>
          <i className="fa-solid fa-xmark modal-exit"></i>
        </div>

        <Grid>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <CleaningServicesIcon style={iconStyle} />
            </Avatar>
            <h1 style={companyName}>upKeeper</h1>

            <h3>Rating Card</h3>
          </Grid>
          {/* <form onSubmit={submitHandler}> */}
            <TextField
              onChange={(event) => handleInput(event)}
              name="message"
              id="outlined-basic"
              label="Message"
              value={newRating.message}
              variant="outlined"
              fullWidth
              required
              style={fieldStyle}
            />
            <TextField
              onChange={(event) => handleInput(event)}
              name="rating"
              id="outlined-basic"
              label="rating"
              value={newRating.rating}
              variant="outlined"
              fullWidth
              required
              style={fieldStyle}
            />

          <Button
            type="submit"
            fullWidth
            style={buttonStyle}
            color="primary"
            onClick={sendRatingData}
          >
            SUBMIT
          </Button>
          {/* </form> */}
        </Grid>
      </header>
      <main className="modal-content"></main>
    </section>
  );
};

export default RatingModal;
