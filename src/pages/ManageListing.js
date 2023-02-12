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
  const [listingData, setListingData] = useState({
    name: "",
    description: "",
    rooms: '',
    price: 100,
    startDate: new Date(),
    endDate: new Date(),
  });
  const [locationData, setLocationData] = useState({
    address: '',
    country: '',
    city: '',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ListingForm setParentListingData={setListingData} initialListingData={listingData}/>;
      case 1:
        return <LocationForm setParentLocationData={setLocationData} initialLocationData={locationData}/>;
      case 2:
        return <Review finaldata={Object.assign({}, listingData,locationData)} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
