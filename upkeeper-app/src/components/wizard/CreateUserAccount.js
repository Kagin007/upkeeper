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
import { authContext } from "../../providers/AuthProvider";


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

export default function CreateUserAccount(props) {
  // const [userId, setUserId] = useState(null)
  const {memberData} = props;
  const { setCredentials, credentials } = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState({})
  
  const sendUserData = () => {
    axios.post('/api/register', props.userData)
    .then(res => {
      props.increment()
      console.log("Success", res.data);
      props.setMemberData( {...memberData, user: res.data.id})
      setCredentials({username: props.userData.username, password: props.userData.password})
    })
    .catch(err => {
      if (err.response) {
        setErrorMessage(err.response.data)
      }
      console.log("Failure", err);
    });
  }  

  const handleInput = (event) => {
    const newData = {...props.userData}
    newData[event.target.id] = event.target.value
    props.setUserData(newData)
    console.log(newData)
  };


  return (
    <Grid>
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <CleaningServicesIcon style={iconStyle} />
        </Avatar>
        <h1 style={companyName}>upKeeper</h1>

        <h3>Create An Account</h3>
      </Grid>
      <TextField
        onChange={(event) => handleInput(event)}
        id="first_name"
        value={props.userData.first_name}
        label="First Name"
        variant="outlined"
        type="text"
        fullWidth
        required
        style={fieldStyle}
      />
      <TextField
        onChange={(event) => handleInput(event)}
        id="last_name"
        value={props.userData.last_name}
        label="Last Name"
        variant="outlined"
        type="text"
        fullWidth
        required
        style={fieldStyle}
      />
       <TextField
        onChange={(event) => handleInput(event)}
        id="username"
        value={props.userData.username}
        label="Username"
        variant="outlined"
        type="text"
        fullWidth
        required
        style={fieldStyle}
      />
      <TextField
        onChange={(event) => handleInput(event)}
        id="email"
        value={props.userData.email}
        label="Email"
        variant="outlined"
        type="email"
        fullWidth
        required
        style={fieldStyle}
      />
      <TextField
        onChange={(event) => handleInput(event)}
        id="password"
        value={props.userData.password}
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        required
        style={fieldStyle}
      />

            <TextField
        onChange={(event) => handleInput(event)}
        id="password2"
        value={props.userData.password2}
        label=" Confirm Password"
        type="password"
        variant="outlined"
        fullWidth
        required
        style={fieldStyle}
      />

      <ul> {Object.keys(errorMessage).map((key) => {

        return (<li>{key}: {errorMessage[key]} </li>);
      })}
      </ul>

      <Button
        type="submit"
        fullWidth
        style={buttonStyle}
        color="primary"
        onClick={props.decrement}
      >
        BACK
      </Button>


      <Button
        type="submit"
        fullWidth
        style={buttonStyle}
        color="primary"
        onClick={sendUserData}
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
