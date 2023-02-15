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
import { ImageList } from "@mui/material";
import ImageListItem from "@mui/material";

export default function ListingForm({setParentListingData, initialListingData}) {
  const [listingData, setListingData] = useState(initialListingData);

  function validate(value, regex) {
    console.log("validateing");
    const regx = new RegExp(regex);
    console.log(regx.test(value));
    return regx.test(value);
  }

  function handleListingParam(param, value) {
    let data = JSON.parse(JSON.stringify(listingData));
    data[param] = value;
    console.log(data);
    setListingData(data);
    setParentListingData(data);
    // console.log(setParentListingData);
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
            value={listingData.name}
            onChange={(event)=>handleListingParam('name', event.target.value)}
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
            value={listingData.description}
            onChange={(event)=>handleListingParam('description', event.target.value)}
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
            value={listingData.rooms}
            onChange={(event)=>handleListingParam('rooms', event.target.value)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="price"
            value={listingData.price}
            onChange={(event)=>handleListingParam('price', event.target.value)}
            // error={!validate(listingData.price, "[0-9]")}
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
        <Grid item xs={12}>
          <TextField
            multiline
            id="imgURL"
            value={listingData.imgURL}
            onChange={(event)=>handleListingParam('imgURL', event.target.value)}
            name="imgURL"
            label="Images src list, each src on a new line"
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}