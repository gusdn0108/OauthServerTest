const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
dotenv.config();


const baseUrl = "http://localhost:8000/api/Oauth";
const Otp = {
  clientId: "abcd",
  clientSecret: "eeeee",
  redirectUri: "http://localhost:3500",
};
const corsUrl = `http://localhost:8000/api/Oauth/authorize?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`

app.use(cors({
  origin: '*',
  credentials: true,
}))



app.get("/RedirectUrl", (req, res) => {
  const url = `http://localhost:8000/api/Oauth/authorize?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`;
  res.redirect(url);
});

app.post("/getCode", async (req, res) => {
  const RestAPI = Otp.clientId
  const Data = {
    clientId: RestAPI,
    grant_type: "authorization_code",
    code: req.body.code,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
     await axios.post(`${baseUrl}/getToken`, Data);
  } catch (error) {
    console.log(error);
  }
});

app.post('/oAuthGetToken',async (req,res)=>{
  const response = req.body


  const user = {
    userId: "gusdn6671@naver.com",
    userPw: "asdf1234",
  };

  const ID_TOKEN = jwt.sign({
      user
  },
  process.env.SECRET_KEY
  )
  ID_TOKEN.split('.')[1]
  
  response.id_token =ID_TOKEN.split('.')[1]




const token = {
    response  
}
  // const TokenUserId = JSON.parse(Buffer.from(splitToken, 'base64').toString('utf-8')).user.userId
  // const TokenUserPw = JSON.parse(Buffer.from(splitToken, 'base64').toString('utf-8')).user.userPw
  // console.log(TokenUserId,TokenUserPw)
/**
 * oauth서버에서 DATA값받아옴 
 * 그 DATA 값에 id_token을 추가해서 front 에 token저장해줘야함 ;
 * 프론트에서 그리고 그 토큰값을 풀어서 userId 랑 userpw 를 대조해서 맞으면 로그인을 성공시켜줘야함 
 * 의문점 ? : ACCESS_TOKEN에도 USER값이들어가있는데 굳이 왜 ID_TOKEN을 만들어주는지 모르겠음 ...
 * 의문점 풀이 : access_token은 사실상 back oauth검증 / id _token은 백이랑 프론트 검증용? 이라고생각해보고있음..
 * */ 
console.log(token)
const url = 'http://localhost:8000/api/Oauth/authorize?clientId=abcd&redirectUri=http://localhost:3500&response_type=code'
try {
console.log(token)
res.json({
  status:true,
  token:token
})

} catch (error) {
  
}
  
})

app.listen(3500, () => {
  console.log("back server start 3500");
});
