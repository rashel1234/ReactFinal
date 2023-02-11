const { response } = require("express");
const mongoose = require("mongoose");

function connectToMongo() {
  mongoose
    .connect(
      "mongodb+srv://reactAdmin:addr123456@cluster0.jjt8klo.mongodb.net/airbnb",
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("mongo connection open!!");
      scrapeCountries();
    })
    .catch((err) => {
      console.log("no connection start");
    });
}

const apartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
    min: 100,
  },
  address: {
    type: String,
    require: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  rooms: {
    type: Number,
    require: true,
    min: 1,
  },
  description: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
});

const countriesSchema = new mongoose.Schema({
  iso2: {
    type: String,
    require: false,
  },
  iso3: {
    type: String,
    require: false,
  },
  country: {
    type: String,
    require: true,
  },
  cities: {
    type: [],
    require: true,
  },
});

const user = mongoose.model("Users", userSchema);
const apartment = mongoose.model("Apartments", apartmentSchema);
const country = mongoose.model("countries", countriesSchema);

async function getApartments() {
  const apartmentsData = await apartment.find();

  return JSON.stringify(apartmentsData);
}

async function insertUser(userObject) {
  var userRecord = new user(userObject);

  userRecord.save((err, user) => {
    if (err) {
      console.log(err);
    } else {
      console.log(user.fullName);
    }
  });
}

async function scrapeCountries() {
  fetch("https://countriesnow.space/api/v0.1/countries", {})
    .then((promise) => promise.json())
    .then((response) => {
      // console.log(response['data'])

      country.deleteMany({});
      country.insertMany(response["data"], (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("scraped countries");
        }
      });
    });
}

module.exports = { getApartments, insertUser, scrapeCountries, connectToMongo };
