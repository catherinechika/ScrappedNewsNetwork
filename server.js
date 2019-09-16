const express = require("express");
const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");
var db = require("./models");
const mongoose = require('mongoose')


const app = express();
PORT = 3000

// MIDDLEWARE
// app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// MONGOOSE
mongoose.connect('mongodb://localhost:27017/articledb', { useUnifiedTopology: true, useNewUrlParser: true })

//  Get the raw data from the link with axios
axios
    .get("https://www.google.com/search?q=google+news&tbm=nws&sa=X&rlz=1C5CHFA_enUS777US777&biw=1440&bih=772&sxsrf=ACYBGNQ4gscAXGUw57s9hX8Ey-XROKlOrw:1568338398977&gbv=1&sei=3vF6XYuWO6-KggeK7ILYCw")
    .then(function (response) {

        const $ = cheerio.load(response.data);
        const selection = [];
        // parse the title, summmary,link
        $(".g")
            .each(function (i, element) {
                let title = $(element)
                    .children()
                    .text();
                let summary = $(element)
                    .find($('.st'))
                    .text()
                let link = $(element)
                    .find("a")
                    .attr("href");
                // push them into an array
                selection.push({
                    title: title,
                    link: link,
                    summary: summary
                });
            });

        // send the selection to dom as json
        app.get("/api/article", function (req, res) {
            res.json(selection);
        });

        db.Article.create(selection)
            .then(function (dbArticle) {
                // console.log(dbArticle)
            })
            .catch(function (err) {
                console.log(err.message)
            })

        app.get('/all', function (req, res) {
            db.Article.find({}, function (err, found) {
                if (err) {
                    console.log(err)
                } else {
                    res.json(found)
                }
            })
        })
    });

app.listen(PORT, function () {
    console.log("App running on port 3000!");
});
