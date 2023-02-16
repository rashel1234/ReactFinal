import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Carousel from "nuka-carousel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  itemName: {
    marginBottom: theme.spacing(2),
  },
}));

export const property = {
  name: "Luxury Beachfront Villa",
  address: "123 Ocean Ave",
  country: "FL 33139",
  city: "Miami Beach",
  rooms: 3,
  price: 200,
  imgURL: [
    "https://via.placeholder.com/800x600/caf4fe/ffffff?text=Image+1",
    "https://via.placeholder.com/800x600/caf4fe/ffffff?text=Image+2",
    "https://via.placeholder.com/800x600/caf4fe/ffffff?text=Image+3",
  ],
  unavailableDates: "2023-02-15,2023-02-16,2023-02-17,2023-02-18",
  description: "Description",
};

const Property = (props) => {
  const classes = useStyles();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const history = useHistory();

  const handleCalendar = () => {
    console.log(props.apartment.imgURL.split("\n"));
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const book = () => {
    let apt = props.apartment;
    apt.unavailableDates += `,${selectedDate.toISOString().split("T")[0]}`;

    console.log(JSON.stringify(apt));

    //To update apartment with apt._id with apt object with the updated booked dates
    fetch(`http://localhost:9000/apartmentsData/id?id=${apt._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.assign({}, apt)),
    })
      .then((res) => {
        return res;
      })
      .then((data) => {
        console.log("updated apt!");

        // history.goBack();
        window.location.reload();
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Carousel>
            {props.apartment.imgURL.split("\n").map((image) => (
              <CardMedia
                key={image}
                className={classes.media}
                image={image}
                title={props.apartment.name}
              />
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.itemName} variant="h5">
                {props.apartment.name}
              </Typography>
              <Typography variant="subtitle1">
                {props.apartment.address}, {props.apartment.city},{" "}
                {props.apartment.country}
              </Typography>
              <Typography variant="subtitle2">
                {props.apartment.rooms} rooms - {props.apartment.price}$/night
              </Typography>
              <Typography variant="subtitle2">
                Description - {props.apartment.description}
              </Typography>
              {selectedDate && (
                <Typography variant="subtitle2">
                  Selected Date - {selectedDate.toISOString().split("T")[0]}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleCalendar}
              >
                Select Dates
              </Button>
              {showCalendar && (
                <Calendar
                  onChange={handleDateSelect}
                  tileDisabled={({ date, view }) =>
                    props.apartment.unavailableDates
                      .split(",")
                      .includes(date.toLocaleDateString())
                  }
                />
              )}
              {selectedDate && (
                <Button onClick={book} variant="contained" color="secondary">
                  Book Now
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Property;
