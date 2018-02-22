const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("error", console.error.bind(console, "Connection Error: "))
mongoose.connection.once("open", () => console.log("Connected!"))

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  "shorten": { type: Number, unique: true },
  "original" : { type: String, unique: true }
})

urlSchema.pre("save", function(next) {
  var url = this;
  Url.findOne().sort({ shorten: "descending" }).exec((err, res) => {
    if (err) throw err;
    url.shorten = res.shorten + 1;
    next();
  })
})

const Url = mongoose.model("Url", urlSchema)

module.exports = Url;
