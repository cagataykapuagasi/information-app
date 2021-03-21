const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const locationSchema = new Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
      minlength: 3,
    },
    no: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
      index: true,
      minlength: 1,
    },
    location: locationSchema,
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator, { message: "is already taken." });

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Bus", schema);
