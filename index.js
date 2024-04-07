const express = require("express");
const request = require("request");

dotenv = require("@dotenvx/dotenvx").config();

const app = express();
app.set("view engine", "ejs");

const appId = "17992";
const appSecret = process.env.CLIENT_SECRET;
const appRedirect = "https://anilist.co/api/v2/oauth/pin";

var key = null;

app.get("/", (req, res) => {
  key = req.query.access_token;

  // check
  if (key) {
    var options = {
      uri: "https://anilist.co/api/v2/oauth/token",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      json: {
        grant_type: "authorization_code",
        client_id: appId,
        client_secret: appSecret,
        redirect_uri: appRedirect, // http://example.com/callback
        code: key, // The Authorization Code received previously
      },
    };
    console.log("sending request");
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200 && !body.error) {
        res.render("main", { key: body.access_token });
        console.log(body);
      }
    });
  } else {
    res.redirect("login");
  }
});

function getSequels(OAuthKey) {
  // get the user's list
  query = ''

  var options = {
    uri: "https://graphql.anilist.co",
    method: "POST",
    headers: {
      Authorization: "Bearer " + OAuthKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    json: {
      query: query,
    },
  };


  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body.data);
    }
  });
}

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(3000);
