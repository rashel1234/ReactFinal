import { Fragment, useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ListingForm from "../components/ManageListing/ListingForm";
import LocationForm from "../components/ManageListing/LocationForm";
import Review from "../components/ManageListing/Review";

const steps = [
  "Availability & Price",
  "Apartment Location",
  "Review your listing",
];

const theme = createTheme();

export default function ManageListing() {
  const [initComplete, setInitComplete] = useState(false);
  const [listingData, setListingData] = useState({
    name: "",
    description: "",
    rooms: "",
    price: 100,
    imgURL:""
  });
  const [locationData, setLocationData] = useState({
    address: "",
    country: "",
    city: "",
  });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    console.log(initComplete);
    if (!initComplete) {
      const id = new URLSearchParams(window.location.search).get("id");
      if (id) {
        fetch(`http://localhost:9000/apartmentsData/id?id=${id}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setListingData({
              name: data["name"],
              description: data["description"],
              rooms: data["rooms"],
              price: data["price"],
               // startDate: data["startDate"],
              // endDate: data["endDate"],
              imgURL: data["imgURL"]
            });
            setLocationData({
              address: data["address"],
              country: data["country"],
              city: data["city"],
            });
            setInitComplete(true);
          });
      }
    } else {
      setInitComplete(true);
    }
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ListingForm
            setParentListingData={setListingData}
            initialListingData={listingData}
          />
        );
      case 1:
        return (
          <LocationForm
            setParentLocationData={setLocationData}
            initialLocationData={locationData}
          />
        );
      case 2:
        return (
          <Review finaldata={Object.assign({}, listingData, locationData)} />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1){ //if publish
    handlePublish();
    }
    };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function handlePublish() {
    const id = new URLSearchParams(window.location.search).get("id");
    if (id != null) {
      fetch(`http://localhost:9000/apartmentsData/id?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.assign({}, listingData, locationData)),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("added apt!");
        });
    } else { //insert
      fetch("http://localhost:9000/apartmentsData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.assign({}, listingData, locationData)),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("added apt!");
        });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Add Apartment
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you.
              </Typography>
              <Typography variant="subtitle1">
                You can view you listing at the Apartments page.
              </Typography>
              {/* <Button variant="contained"
                  onClick={handleNext}>Apartments</Button> */}
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Publish" : "Next"}
                </Button>
              </Box>
            </Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
