# Oauth 서버 필요 페이지

kakao developer 참고

1.프론트간 Oauth로그인버튼
2.Oauth 로그인창 ( 카카오 로그인 눌렀을때 뜨는 창 )
3.Oauth developers {
  1-0 : https://developers.kakao.com/console/app 
  1-1 : Oauth로그인 되있는 사이트조회 및 연결끊기 
}



1. 사용자 > 프론트에서 oauth 로그인 버튼 클릭

<a href="http://localhost:3500/RedirectUrl">로그인하러가기</a>


2. 서버가 지정한 리다이렉트 uri로 이동

즉, http://localhost:3500/RedirectUrl 

이 uri로 접속해 get 요청을 보내면 응답으로 oauth 로그인 페이지로 리다이렉트 시켜줌


app.get("/RedirectUrl", (req, res) => {
  const url = `http://localhost:8000/api/Oauth/authorize?clientId=${Otp.clientId}&redirectUri=${Otp.redirectUri}&response_type=code`;
  res.redirect(url);
});


url을 잘 보면

http://localhost:8000/api/Oauth/authorize  //

?clientId=${Otp.clientId}

&redirectUri=${Otp.redirectUri}

&response_type=code

이렇게 네 부분으로 쪼갤 수 있다.

순서대로 

i) oauth 로그인 페이지 uri

ii) clientId : 서버가 oauth에게 받은 client_id

iii) redirectUri : 서버가 oauth에 등록한 리다이렉트 uri

iv) response를 코드로 줘라는 말인듯.. 상수라고 봐도 될 것 같다.

url 예시

http://localhost:8000/api/Oauth/authorize?clientId=abcd&redirectUri=http://localhost:3500&response_type=code

이 경우, 서버가 client_id를 abcd, redirecturi는 http://localhost:3500으로 지정했다는 걸 알 수 있다.


3. 아무튼 로그인 페이지 uri에선 말 그대로 oauth 로그인 페이지를 보여준다.

여기 id, pw를 입력해 제출한다.

http://localhost:8000/api/Oauth/authorize << 여기로 제출

oauth서버에선 이 정보를 일고 등록된 사용자인지 (블록체인과 ix) 확인 후,

등록된 사용자라면 맞다고 응답을 로컬 서버에 준다.


`이 때, 사용자의 id, pw를 함께 줘야하나? 맞는 듯 이 부분 수정해야 할 것 같다.`


await axios.post("http://localhost:3500/getCode", response);


4. 로컬 서버는 응답을 확인 후, access token을 만드는데 필요한 데이터(데이터 형식, client_id 등)

를 모아서 다시 oauth서버에 토큰 생성 요청을 보낸다.

const Data = {
    clientId: RestAPI,
    grant_type: "authorization_code",
    code: req.body.code,
    headers: {
      "Content-Type": "application/json",
    },
};

await axios.post(`${baseUrl}/getToken`, Data);


5. 다시 oauth 서버에선 이걸 받아서 필요한 데이터 (만료 기간, 리프래시 토큰 등..) 를 추가 후,

로컬 서버에 전송한다.

await axios.post('http://localhost:3500/oAuthGetToken',DATA)


6. 로컬 서버에선 oauth에서 보내준 사용자 정보를 로컬 서버의 db와 비교해

일치하는 정보가 있다면 쿠키/토큰을 생성해 응답으로 주고,

없다면 에러 메시지를 띄워준다.

`a,b,c,d > oauth 서버 등록 ? << 나중에 해줄 것..`

