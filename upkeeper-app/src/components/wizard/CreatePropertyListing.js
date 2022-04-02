import React from "react";
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
  backgroundColor: "white"
};





export default function CreatePropertyListing(props) {


  const sendPropertyData = () => {
    axios.post('/api/properties', props.propertyData)
    .then(res => {
      props.increment()
      console.log("Success", res.data);
    })
    .catch(err => {
      console.log("Failure", err);
    });
    }

  const handleInput = (event) => {
    const newData = {...props.propertyData}
    newData[event.target.id] = event.target.value
    props.setPropertyData(newData)
    console.log(newData)
  };


  console.log("PROPS", props)
  return (
    <Grid>
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <CleaningServicesIcon style={iconStyle} />
        </Avatar>
        <h1 style={companyName}>upKeeper</h1>
        <h3>Post your listing</h3>
      </Grid>
      <TextField
         onChange={(event) => handleInput(event)}
         id="title"
         value={props.propertyData.title}
         label="Title"
        variant="outlined"
        fullWidth
        required
        style={fieldStyle}
      />
      <TextField
         onChange={(event) => handleInput(event)}
         id="description"
         value={props.propertyData.description}
        label="Description"
        variant="outlined"
        fullWidth
        required
        style={fieldStyle}
      />
      <TextField
       onChange={(event) => handleInput(event)}
       id="address"
       value={props.propertyData.address}
        label="Address"
        variant="outlined"
        fullWidth
        required
        style={fieldStyle}
      />
      <TextField
         onChange={(event) => handleInput(event)}
         id="photo_url"
         value={props.propertyData.photo_url}
        label="Upload a photo"
        variant="outlined"
        fullWidth
        required
        style={fieldStyle}
      />
      <Button type="submit" 
      fullWidth 
      style={buttonStyle} 
      color="primary" 
      onClick={sendPropertyData}>
        SUBMIT
      </Button>
      <Typography align="center">
        Already have an account?
        <Link href="/login">Sign in here.</Link>
      </Typography>
    </Grid>
  );
}
