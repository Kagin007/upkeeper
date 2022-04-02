import React from "react";
import { Grid, Avatar, Typography, Link, Button, TextField } from "@material-ui/core";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import axios from "axios";




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

export default function EnterLocation(props) {
  const {memberData} = props;
  
  const sendLocationData = () => {
    axios.post('/api/location', props.locationData)
    .then(res => {
      props.increment()
      console.log("Success", res.data);
      props.setMemberData( {...memberData, location: res.data.id})
    })
    .catch(err => {
      console.log("Failure", err);
    });
    }

  const handleInput = (event) => {
    const newData = {...props.locationData}
    newData[event.target.id] = event.target.value
    props.setLocationData(newData)
    console.log(newData)
  };

  return (
    <Grid>
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <CleaningServicesIcon style={iconStyle} />
        </Avatar>
        <h1 style={companyName}>upKeeper</h1>

        <h3>What is your address?</h3>
      </Grid>
      <TextField
        onChange={(event) => handleInput(event)}
        id="address"
        value={props.locationData.address}
        label="Address"
        variant="outlined"
        type="text"
        fullWidth
        required
        style={fieldStyle}
      />
      <TextField
        onChange={(event) => handleInput(event)}
        id="city"
        value={props.locationData.city}
        label="City"
        variant="outlined"
        type="text"
        fullWidth
        required
        style={fieldStyle}
      />
        <TextField
        onChange={(event) => handleInput(event)}
        id="province"
        value={props.locationData.province}
        label="Province"
        variant="outlined"
        type="text"
        fullWidth
        required
        style={fieldStyle}
      />
      <Button
        type="submit"
        fullWidth
        style={buttonStyle}
        color="primary"
        onClick={sendLocationData}
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

