import React, {useContext} from "react";
import { Grid, Avatar, Typography, Link, Button } from "@material-ui/core";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { authContext } from "../../providers/AuthProvider";
import axios from 'axios';

const avatarStyle = {
  backgroundColor: "#98b4aa",
  width: "100px",
  height: "100px",
};

const buttonStyle = {
  margin: "25px 0",
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


export default function HomeOwnerComplete(props) {
  const { credentials, login } = useContext(authContext);

  const submitHandler = () => {
    console.log(credentials)
    axios
      .post(`/api/login`, credentials)
      .then(res => {
        console.log(res.data.username, res.data.id)
        login(res.data.username, res.data.id);
        props.onClose()
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Grid>
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <CleaningServicesIcon style={iconStyle} />
        </Avatar>
        <h1 style={companyName}>upKeeper</h1>

        <h1>Your profile and property listing have been created!</h1>
        <u>View it here</u>
      </Grid>
{/* href="/"
type="submit" */}
      <Button  fullWidth style={buttonStyle} color="primary" onClick={submitHandler}> 
        CLOSE
      </Button>
      <Typography align="center">
        Already have an account?
        <Link href="/login">Sign in here.</Link>
      </Typography>
    </Grid>
  );
}
