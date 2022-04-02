import React, { useState } from "react";
import { Grid, Avatar, Typography, Link, Button } from "@material-ui/core";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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

const radioStyle = {
  justifyContent: "center",
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


export default function ChooseRole(props) {
  const [role, setRole] = useState("");
  const {memberData} = props;

 
  const handleInput = (event) => {
    const newData = {...props.userData}
    newData['role'] = event.target.value
    props.setUserData(newData)
    
    setRole("owner")
    props.setMemberData( {...memberData, role: newData.role})
    console.log('new data', newData)
  };
  

  return (
    <Grid>
      <Grid align="center">
        <Avatar style={avatarStyle}>
          <CleaningServicesIcon style={iconStyle} />
        </Avatar>
        <h1 style={companyName}>upKeeper</h1>

        <h3>I am a...</h3>
      </Grid>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        style={radioStyle}
      >
        <FormControlLabel
          onClick={(event) => handleInput(event)}
          id="cleaner"
          value="cleaner"
          control={<Radio onChange={() => props.roleSelected("cleaner")} />}
          label="Cleaner"
          type="radio"
          // checked={role === "cleaner"}
          
        />
        <FormControlLabel
          onClick={(event) => handleInput(event)}
          id="owner"
          value="owner"
          control={<Radio onChange={() => props.roleSelected("owner")} />}
          label="Home Owner"
          type="radio"
        />
      </RadioGroup>
      <Button
        disabled={role.length===0}
        type="submit"
        fullWidth
        style={buttonStyle}
        color="primary"
        onClick={()=>{if(props.increment){
          props.increment()
        }}}
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
