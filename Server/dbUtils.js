const { response } = require("express");
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;

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
      require: true
  },
  email: {
      type: String,
      require: true
  },
  type: {
      type: String,
      require: true
  },
  age: {
      type: Number,
      min: 18
  },
  address: {
      type: String
  }
})


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
async function getApartmentbyId(id) {
  apt = await apartment.findById(id).exec();
  return apt;
}
async function updateApartmentbyId(id, updatedApt) {
  apartment.findByIdAndUpdate(id,updatedApt, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
    }
  });  
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

async function getUserByEmail(email) {
  let result = {};

  result = await user.findOne({'email': email})

  return JSON.stringify(result);
}

async function insertApartment(aptData) {
  var aptRecord = new apartment(aptData);

  aptRecord.save((err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
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

async function getCountries() {
  const countriesList = await country.find({}).select("country"); //TODO index
  return JSON.stringify(countriesList.map((obj) => obj.country));
}
async function getCitiesByCountry(countryInput) {
  const citiesList = await country.findOne({ country: countryInput });

  return JSON.stringify(citiesList.cities);
}

module.exports = {
  getApartments,
  insertUser,
  getUserByEmail,
  insertApartment,
  updateApartmentbyId,
  getApartmentbyId,
  scrapeCountries,
  getCountries,
  getCitiesByCountry,
  connectToMongo,
};
