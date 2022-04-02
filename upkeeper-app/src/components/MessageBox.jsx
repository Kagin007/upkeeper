import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import CloseIcon from '@mui/icons-material/Close';



export default function MessageBox() {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 600,
    margin: "20px auto",
  };

  const closeStyle = {
    justifyContent: "flex-end"
  }

  const boxStyle = {
    height:"60vh",
    width: "70vw",
    
  }


  return (
    <Grid>
    <Paper elevation={10} style={paperStyle}>
      <CloseIcon style={closeStyle}/>
      <Grid align="center">
     <h3>Send *user* a message:</h3>
    <TextField
      placeholder="Type your message"
      multiline
      rows={2}
      maxRows={10}
      style={boxStyle}
    />
    </Grid>
     <Button type="submit" style={buttonStyle} fullWidth color="primary">
          SEND
        </Button>
    </Paper>
    </Grid>
   );
}
