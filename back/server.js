const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const baseUrl = "http://localhost:8000/api/Oauth";
const Otp = {
  clientId: "abcd",
  clientSecret: "eeeee",
  redirectUri: "http://localhost:3500",
};

app.get("/RedirectUrl", (req, res) => {
  const url = `http://localhost:8000/api/Oauth/authorize?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`;
  res.redirect(url);
});

app.post("/getCode", (req, res) => {
  console.log("옴??");
  const Data = {
    clientId: Otp.clientId,
    grant_type: "authorization_code",
    code: req.body.code,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(Data);
  try {
    axios.post(`${baseUrl}/getToken`, Data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3500, () => {
  console.log("back server start 3500");
});
