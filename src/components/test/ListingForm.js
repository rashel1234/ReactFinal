import { Fragment, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

export default function ListingForm() {
  const [listingData, setListingData] = useState({
    name: "",
    description: "",
    rooms: 1,
    price: 100,
    startDate: new Date(),
    endDate: new Date(),
  });

  function validate(value, regex) {
    console.log("validateing");
    const regx = new RegExp(regex);
    console.log(regx.test(value));
    return regx.test(value);
  }

  function handleListingParam(param, value) {
    let data = JSON.parse(JSON.stringify(listingData));
    data[param] = value;
    // console.log(data);
    setListingData(data);
    // console.log(listingData);
  }

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Apartment Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="name"
            helperText="how it will be seen on the site"
            fullWidth
            // autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            multiline
            id="description"
            name="description"
            label="description"
            // helperText="how it will be seen on the site"
            fullWidth
            // autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="rooms"
            name="rooms"
            label="number or rooms"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="price"
            key={listingData.price}
            // value={listingData.price}
            onChange={(event) =>
              handleListingParam("price", event.target.value)
            }
            error={!validate(listingData.price, "[0-9]")}
            // inputProps={{
            InputProps={{
              startAdornment: "₪ ",
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            name="price"
            label="Price"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={6}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              // value={value}
              // onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DesktopDatePicker
              label="End Date"
              inputFormat="DD/MM/YYYY"
              // value={value}
              // onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
        </LocalizationProvider>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </Fragment>
  );
}
