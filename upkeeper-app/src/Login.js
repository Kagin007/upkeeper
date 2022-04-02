import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Typography,
  Link,
  Button,
} from "@material-ui/core";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

export default function Login() {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "20px auto",
  };

  const avatarStyle = {
    backgroundColor: "#98b4aa",
  };

  const buttonStyle = {
    margin: "10px 0",
    backgroundColor: "#98b4aa",
    color: "white",
  };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <CleaningServicesIcon />
          </Avatar>
          <h2>Sign In:</h2>
        </Grid>
        <TextField label="Email" fullWidth required />
        <TextField label="Password" type="password" fullWidth required />
        <Button type="submit" style={buttonStyle} fullWidth color="primary">
          SIGN IN
        </Button>
        <Typography>
          {" "}
          Don't have an account yet?
          <Link href="/register">Sign up here.</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
