function requestInterceptor() {

  
    
  
}

function responseInterceptor() {
  // accessToken 만료 됐다고 response 왔을 때
  res = response
  if (res.errorCode === "401") {

    // cookie에 저장된 refreshToken 만료기간 확인
    if () {
      
    } else {

    }
    
    // refreshToken request / response
    res = response;

    // accessToken 재요청
    axios(res.accessToken);
  } else {
    // refreshToken 만료기간 끝났으면 해당 페이지 접근 금지 redirection /
  }
}


function axios() {

}