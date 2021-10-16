const moongoose = require('mongoose');
require('dotenv').config();
const uri = "mongodb+srv://admin:admin@cluster0.dggb8.mongodb.net/YelpCamp?retryWrites=true&w=majority";


const connectDB = () => {
    moongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('mongo connected'))
        .catch(err => { console.log(err); })
}
module.exports = connectDB;
