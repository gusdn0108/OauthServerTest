const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const router = express.Router();

router.get("/authorize", (req, res) => {
  res.render("index.html");
});

router.post("/authorize", async(req, res) => {
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
      await axios.post("http://localhost:3500/getCode", response);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/getToken", async(req, res) => {
  console.log("1111");
 
    const MAKE_ACCESS_TOKEN = req.body
    const EXPIRES_IN = 43199
    const REFRESH_TOKEN_EXPIRES_IN = 25184000

    const TOKEN = jwt.sign({
      MAKE_ACCESS_TOKEN,
      exp: EXPIRES_IN
    },
      process.env.SECRET_KEY
    )

 
    const TOKEN2 = jwt.sign({
      MAKE_ACCESS_TOKEN,
      exp: REFRESH_TOKEN_EXPIRES_IN
    },
    process.env.SECRET_KEY
    )

    /**
     * 
     * "token_type":"bearer",
      "access_token":"${ACCESS_TOKEN}",
      "expires_in":43199,
      "refresh_token":"${REFRESH_TOKEN}",
      "refresh_token_expires_in":25184000,
      "scope":"account_email profile"
     * 1. 유저의 토큰 ? 
     * 2. 토큰 유지시간?
     * 3. 재발급받은 토큰 ? 
     * 4. 재발급 받은 토큰의 유지시간?
     * 5. 고정값 ?
     * 
     * 찾아본 정보 :
     * access_token은 발급 받은 후 12시간-24시간(정책에 따라 변동 가능)동안 유효합니다.
     * refresh token은 두달간 유효하며, refresh token 만료가 1달 이내로 남은 시점에서 
     * 사용자 토큰 갱신 요청을 하면 갱신된 access token과 갱신된 refresh token이 함께 반환됩니다.
    */
    const TOKEN_TYPE = "bearer"
    const REFRESH_TOKEN = TOKEN2.split('.')[1]
    const ACCESS_TOKEN = TOKEN.split('.')[1]

    const DATA = {
      TOKEN_TYPE:TOKEN_TYPE,
      ACCESS_TOKEN:ACCESS_TOKEN,
      EXPIRES_IN:EXPIRES_IN,
      REFRESH_TOKEN:REFRESH_TOKEN,
      REFRESH_TOKEN_EXPIRES_IN:REFRESH_TOKEN_EXPIRES_IN,
      scope:"account_email profile"

    }
    
    try {
     await axios.post('http://localhost:3500/oAuthGetToken',DATA)
    } catch (error) {
      console.log(error)
    }
  
 
});


module.exports = router;
