const port = 3000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { find } = require("domutils");
const cors = require("cors");
const app = express();

app.use(cors());

const url = "https://www.theguardian.com/uk";

app.get("/", (req, res) => {
  res.json("My Web Scraper!");
});

app.get("/results", (req, res) => {
  axios(url)
    .then((respons) => {
      const html = respons.data;
      const $ = cheerio.load(html);
      const articles = [];

      $(".fc-item__title", html).each(function () {
        const title = $(this).text();
        const link = $(this).find("a").attr("href");
        articles.push({
          title,
          link,
        });
      });
      res.json(articles);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
