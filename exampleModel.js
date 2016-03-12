var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExampleSchema = new Schema ({
  string: {
    type: String,
    trim: true,
    required: "String is required!"
  },
  number: {
    type: Number,
    unique: true,
    required: true
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a real email"]
  }
})