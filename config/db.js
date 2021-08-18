const moongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;


const connectDB = () => {
    moongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('mongo connected'))
        .catch(err => { console.log(err); })
}
module.exports = connectDB;