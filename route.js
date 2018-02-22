var u = require("url");
var express = require("express")
const mongoose = require("mongoose")
const Url = require("./model")

var router = express.Router()

router.get("/:shorten", (req, res) => {
  Url.findOne({shorten: req.params.shorten}, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.redirect(data.original);
  })
})

// new route
router.get("/new/*", (req, res) => {
  var url = req.params[0]
  
  if (isValid(url)) {

    Url.findOne({ original: url }, (err, data) => {
      if (err) throw err;

      if (data === null) {
        var newURL = new Url({ original: url })
        newURL.save((err, newData) => {
          if (err) throw err;
          console.log(newData);
          var newData = {
            "original_url": newData.original,
            "short_url": fullUrl(req) + "/" + newData.shorten
          }
          res.json(newData)
        })
      } else {
        const result = {
          "original_url": data.original,
          "short_url": fullUrl(req) + "/" + data.shorten
        }
        res.json(result)
      }
    })

  } else {
    res.json({ "error": "Invalied URL" })
  }
})

module.exports = router;

/* Functions */
function isValid(url) {
  var urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/

  return urlPattern.test(url)
}

function fullUrl(req) {
  return u.format({
    protocol: req.protocol,
    host: req.get('host')
  });
}
