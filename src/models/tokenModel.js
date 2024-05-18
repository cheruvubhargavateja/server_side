const mongoose = require('mongoose');

const currentDate = new Date();

const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear();

// Format the date as "DD-MM-YYYY"
const formattedDate = `${day}-${month}-${year}`;


// Define schema for the Token model
const tokensSchema = new mongoose.Schema({
  name: {type:String, required: true},
  mobile: {type:Number, required: true},
  age: {type:Number, required: true},
  currentDate: {type: Date, default:formattedDate},
  tokenNumber: {type: Number, required: true},
  isBooked: {type: Boolean, default:false}
});

// Create Token model based on the schema
const Tokens = mongoose.model('Tokens', tokensSchema);

module.exports = Tokens;
