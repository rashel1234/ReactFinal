const mongoose = require ('mongoose');

function connectToMongo() {
mongoose.connect('mongodb+srv://reactAdmin:addr123456@cluster0.jjt8klo.mongodb.net/test', { useNewUrlParser: true })
    .then(() => {
        console.log("mongo connection open!!");
    }).catch(err => {
        console.log("no connection start");
    })
}

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 100
    },
    address: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        require: true 
    },
    endDate: {
        type: Date,
        require: true 
    },
    rooms: {
        type: Number,
        require: true,
        min: 1
    },
    description: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    }
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

const user = mongoose.model('Users', userSchema);
const apartment = mongoose.model('Apartments', apartmentSchema);

async function getApartments() {
    const apartmentsData = await apartment.find();

    return JSON.stringify(apartmentsData);
}

async function insertUser(userObject) {
    var userRecord = new user(userObject);

    userRecord.save((err, user) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(user.fullName); 
        }
    });
}

async function getUserByEmail(email) {
    let result = {};

    result = await user.findOne({'email': email})

    return JSON.stringify(result);
}

async function updateUser(userObject) {
    console.log(userObject)
    let filter = {'email': userObject.email}

    let res = await user.findOneAndUpdate(filter, userObject, {new: true});
    console.log(res);
}

module.exports = {updateUser, getUserByEmail, getApartments, insertUser, connectToMongo}