
const mongoose = require('mongoose');
require('dotenv').config();


const DATABASE_URL = process.env.MONGODB_URL;

const dbConnect = () => {
    mongoose.connect(DATABASE_URL)
    .then(()=> {
        console.log("DB connection successfull");
    })
    .catch((error)=> {
        console.log(error);
        console.error(error);
        process.exit(1);
    })
}

module.exports = { dbConnect };

