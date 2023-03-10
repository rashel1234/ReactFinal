import * as React from "react";
import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ProfileComponent = () => {
  const email = localStorage.getItem("user");
  const [fullName, setfullName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const [severity, setSeverity] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  useEffect(() => {
    fetch("http://localhost:9000/users/byEmail", {
      method: "POST",
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setfullName(data.fullName);
        setAge(data.age);
        setAddress(data.address);
      });
  }, []);


  const handleUpdate = (e) => {
    e.preventDefault();

    fetch("http://localhost:9000/users/update", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        fullName: fullName,
        age: age,
        address: address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setSeverity("success");
        setAlertText("success");
        setOpenAlert(true);
      })
      .catch((err) => {
        setSeverity("error");
        setAlertText(err.message);
        setOpenAlert(true);
      });
  };

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" sx={{ maxWidth: 300 }}>
          <React.Fragment>
            <CardContent>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  label="Email"
                  disabled
                  variant="standard"
                  value={email}
                />
                <TextField
                  label="Full Name"
                  variant="standard"
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                />
                <TextField
                  label="Age"
                  type={"number"}
                  variant="standard"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  InputProps={{
                    inputProps: {
                      min: 18,
                    },
                  }}
                />
                <TextField
                  label="Address"
                  variant="standard"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleUpdate}>
                Update Details
              </Button>
            </CardActions>
          </React.Fragment>
        </Card>
      </Box>

      <Snackbar
        // anchorOrigin={{'bottom' 'center'}}
        open={openAlert}
        // onClose={handleClose}
        severity={severity}
        message={alertText}
        key="alert"
      />
    </div>
  );
};

export default ProfileComponent;
