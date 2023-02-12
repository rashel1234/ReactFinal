import { Fragment, useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete } from "@mui/material";

export default function LocationForm() {
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState({country:'', city:''});
  // const [selectedCountry, setSelectedCountry] = useState('');
  // const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);
  const [apartmentData, setApartmentData] = useState({
    address: '',
    country: '',
    city: '',
  });

 function handleCountrySelect(country) {
    setSelectedCountry(country);
    fetch(`http://localhost:9000/countries/cities?country=${country}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("cities: " + data);
          setCities(data);
        });
     
  };

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

  function setSelectedCity(city) {
    setSelected({country: selected.country, city:city})
  }
  function setSelectedCountry(country) {
    setSelected({country: country, city:''})
  }

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
            onChange={(event,value)=>handleCountrySelect(value)}
            options={countries}
            fullWidth
            variant="standard"
            renderInput={(params) => <TextField {...params} required label="Country" />}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <Autocomplete
            disablePortal
            id="selectCity"
            value={selected.city}
            onChange={(event,value)=>setSelectedCity(value)}
            options={cities}
            fullWidth
            variant="standard"
            renderInput={(params) => <TextField {...params} required label="City" />}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
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
