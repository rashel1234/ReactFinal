// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import Carousel from "react-material-ui-carousel";
// import { Paper } from "@mui/material";

// const Property = () => {
//   // Replace with props
//   const images = [
//     "https://mars-metcdn-com.global.ssl.fastly.net/content/uploads/sites/18/2015/07/12140648/800x400.png",
//     "https://mars-metcdn-com.global.ssl.fastly.net/content/uploads/sites/18/2015/07/12140648/800x400.png",
//     "https://mars-metcdn-com.global.ssl.fastly.net/content/uploads/sites/18/2015/07/12140648/800x400.png",
//     "https://mars-metcdn-com.global.ssl.fastly.net/content/uploads/sites/18/2015/07/12140648/800x400.png",
//   ];

//   return (
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//         <center>
//           <Carousel>
//             {images.map((item) => (
//               <Item item={item} />
//             ))}
//           </Carousel>
//         </center>
//         <Typography variant="h5" component="div">
//           Subject
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Explanation
//         </Typography>

//         <Typography variant="h5" component="div">
//           Subject
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Explanation
//         </Typography>

//         <Typography variant="h5" component="div">
//           Subject
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Explanation
//         </Typography>

//         <Typography variant="h5" component="div">
//           Subject
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Explanation
//         </Typography>
//       </CardContent>
//     </Card>
//   );

//   function Item(props) {
//     return (
//       <Paper>
//         <img src="https://mars-metcdn-com.global.ssl.fastly.net/content/uploads/sites/18/2015/07/12140648/800x400.png" />
//       </Paper>
//     );
//   }
// };

// export default Property;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Carousel from 'nuka-carousel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Calendar from 'react-calendar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  itemName: {
    marginBottom: theme.spacing(2),
  },
}));

export const property = {
    name: 'Luxury Beachfront Villa',
    address: '123 Ocean Ave, Miami Beach, FL 33139',
    rooms: 3,
    price: 200,
    images: [
      'https://via.placeholder.com/800x600/caf4fe/ffffff?text=Image+1',
      'https://via.placeholder.com/800x600/caf4fe/ffffff?text=Image+2',
      'https://via.placeholder.com/800x600/caf4fe/ffffff?text=Image+3',
    ],
    unavailableDates: [
      '2023-02-15',
      '2023-02-16',
      '2023-02-17',
      '2023-02-18',
    ],
  };
  

const Property = ({ property1 }) => {
  const classes = useStyles();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Carousel>
            {property.images.map((image) => (
              <CardMedia
                key={image}
                className={classes.media}
                image={image}
                title={property.name}
              />
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.itemName} variant="h5">
                {property.name}
              </Typography>
              <Typography variant="subtitle1">
                {property.address}
              </Typography>
              <Typography variant="subtitle2">
                {property.rooms} rooms - {property.price}/night
              </Typography>
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
                    property.unavailableDates.includes(
                      date.toLocaleDateString()
                    )
                  }
                />
              )}
              {selectedDate && (
                <Button variant="contained" color="secondary">
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
