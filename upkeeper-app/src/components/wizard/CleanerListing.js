import React, {useState} from "react";
import {
  Grid,
  Avatar,
  Typography,
  Link,
  Button,
  TextField,
} from "@material-ui/core";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import axios from 'axios'

//FORM STYLES
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

export default function CleanerListing(props) {
  
  const sendMemberData = () => {
    axios.post('/api/member', props.memberData)
    // console.log("MEMBERDATA:", props.memberData)
    .then(res => {
      props.increment()
      console.log("Success", res.data);
      props.setMemberData( {...props.memberData, location: res.data.id})
    })
    .catch(err => {
      console.log("Failure", err);
    });
  }

  const handleInput = (event) => {
    const newData = {...props.memberData}
    newData[event.target.id] = event.target.value
    props.setMemberData(newData)
    console.log(newData)
  };

  return (
    <Grid>
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <CleaningServicesIcon style={iconStyle} />
        </Avatar>
        <h1 style={companyName}>upKeeper</h1>

        <h3>Create your cleaning profile</h3>
      </Grid>
      <div>
        <TextField
         onChange={(event) => handleInput(event)}
          id="pay_rate"
          value={props.memberData.pay_rate}
          type="text"
          label="Enter an hourly rate in Canadian dollars (no decimals)"
          variant="outlined"
          fullWidth
          required
          style={fieldStyle}
        />
         <TextField
         onChange={(event) => handleInput(event)}
          id="imgurl"
          value={props.memberData.imgurl}
          type="text"
          label="Add a photo (Paste as URL)"
          variant="outlined"
          fullWidth
          required
          style={fieldStyle}
        />
      </div>
      <Button
        type="submit"
        fullWidth
        style={buttonStyle}
        color="primary"
        onClick={sendMemberData}
      >
        NEXT
      </Button>
      <Typography align="center">
        Already have an account?
        <Link href="/login">Sign in here.</Link>
      </Typography>
    </Grid>
  );
}
