const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const router = express.Router();

router.get("/authorize", (req, res) => {
  res.render("index.html");
});

router.post("/authorize", (req, res) => {
  const { userId, userPw } = req.body;
  try {
    //블록체인 네트워크에 아이디 패스워드 가져와서 확인
    const user = {
      userId: "gusdn6671@naver.com",
      userPw: "asdf1234",
    };

    if (user.userId === userId && user.userPw === userPw) {
      const response = {
        status: true,
        code: "asdfasfd",
      };
      axios.post("http://localhost:3500/getCode", response);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/getToken", (req, res) => {
  console.log("1111");
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
