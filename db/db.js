const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/hellox", {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(err);
  });
mongoose.Promise = global.Promise;

module.exports = {
  Bus: require("./models/Bus"),
};
