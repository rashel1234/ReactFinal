import { Fragment, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete } from "@mui/material";

export default function LocationForm({
  setParentLocationData,
  initialLocationData,
}) {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [locationData, setlocationData] = useState(initialLocationData);

  function handleCountrySelect(country) {
    setlocationData({
      address:locationData.address,
      country:country,
      city:''
    })
    // handleLocationParam('country', country);
    fetch(`http://localhost:9000/countries/cities?country=${country}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("cities: " + data);
        setCities(data);
      });
  }

  function handleLocationParam(param, value) {
    let data = JSON.parse(JSON.stringify(locationData));
    data[param] = value;
    console.log(data);
    setlocationData(data);
    setParentLocationData(data);
    // console.log(setParentListingData);
  }

  useEffect(() => {
    if (countries.length === 0) {
      fetch("http://localhost:9000/countries")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("countries: " + data);
          setCountries(data);
        });
    }
  });

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Full Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} md={6}>
          <Autocomplete
            disablePortal
            id="selectCountry"
            value={locationData.country}
            onChange={(event, value) => handleCountrySelect(value)}
            options={countries}
            fullWidth
            variant="standard"
            renderInput={(params) => (
              <TextField {...params} required label="Country" />
            )}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <Autocomplete
            disablePortal
            id="selectCity"
            value={locationData.city}
            onChange={(event, value)=>handleLocationParam('city', value)}
            options={cities}
            fullWidth
            variant="standard"
            renderInput={(params) => (
              <TextField {...params} required label="City" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            value={locationData.address}
            onChange={(event)=>handleLocationParam('address', event.target.value)}
            fullWidth
            variant="outlined"
            helperText="without city and Country"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid> */}
      </Grid>
    </Fragment>
  );
}
