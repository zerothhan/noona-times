let news = []
const getLatestNews = async() => {
  let url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=7`);
  
  let header = new Headers({"x-api-key": "v9Fz5l2IIKZyclPPgr6hPOps1U-hswFhiqNdMN8mplE"});

  let response = await fetch(url, {headers: header});
  let data = await response.json();
  news = data.articles;
  console.log(news);
}

getLatestNews();