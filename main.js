let news = []
const getLatestNews = async() => {
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`);
  
  let header = new Headers({"x-api-key": "v9Fz5l2IIKZyclPPgr6hPOps1U-hswFhiqNdMN8mplE"});

  let response = await fetch(url, {headers: header});
  let data = await response.json();
  news = data.articles;
  console.log(news);

  render();
};

const render = () => {
  let newsHTML = "";

  // map은 return 값이 array다. 때문에 array -> string 변환 해줘야 한다. (join)
  newsHTML = news.map((item) => {
    return `
      <div class="row news">
        <div class="col-lg-4">
          <img class="news-img-size"
            src="${
              item.media || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
            }" />
        </div>
        <div class="col-lg-8">
          <h2>${item.title}</h2>
          <p>
            ${
              item.summary == null || item.summary == ""
                ? "내용없음"
                : item.summary.length > 200
                ? item.summary.substring(0, 200) + "..."
                : item.summary
            }
          </p>
          <div>
            ${item.rights || "no source"}
            ${moment(
              item.published_date
            ).fromNow()}
          </div>
        </div>
      </div>
    `;
  }).join("");
  
  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();