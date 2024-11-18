const express = require("express");
const request = require("request");
const axios   = require("axios");
const fs      = require("fs");
const https = require('https');

dotenv = require("@dotenvx/dotenvx").config();

const app = express();
app.set("view engine", "ejs");

const appId = "17992";
const appSecret = process.env.CLIENT_SECRET;
const appRedirect = "https://petermagro.com/animus";

var key = null;

app.get("/animus", (req, res) => {
  res.render("main");
});

const httpsOptions = {
  cert: fs.readFileSync(process.env.CERT_FILE),
  key: fs.readFileSync(process.env.KEY_FILE)
};

console.log(httpsOptions);

https.createServer(httpsOptions, app).listen(process.env.HTTPS_PORT);
