let news = [];
let page = 1;
let total_pages = 0;
let menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

let searchButton = document.getElementById("search-button");
let url;

const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "v9Fz5l2IIKZyclPPgr6hPOps1U-hswFhiqNdMN8mplE",
    });

    url.searchParams.set("page", page);
    console.log(url);
    let response = await fetch(url, { headers: header });
    let data = await response.json();

    if (response.status == 200) {
      console.log("받은 데이터는", data);
      if (data.total_hits == 0) {
        throw new Error("검색된 결과값이 없습니다.");
      }
      console.log("data", data);
      news = data.articles;
      total_pages = data.total_pages;
      page = data.page;
      console.log(news);
      render();
      pagination();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
  );

  getNews();
};

const getNewsByTopic = async (event) => {
  console.log("클릭됨", event.target.textContent);
  let topic = event.target.textContent.toLowerCase();

  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=${topic}&page_size=10`
  );

  getNews();
};

const getNewsByKeyword = async () => {
  let keyword = document.getElementById("search-input").value;

  url = new URL(
    `https://api.newscatcherapi.com/v2/search?countries=KR&q=${keyword}&page_size=10`
  );

  getNews();
};

const render = () => {
  let newsHTML = "";

  // map은 return 값이 array다. 때문에 array -> string 변환 해줘야 한다. (join)
  newsHTML = news
    .map((item) => {
      return `
      <div class="row news">
        <div class="col-lg-4">
          <img class="news-img-size"
            src="${
              item.media ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
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
            ${moment(item.published_date).fromNow()}
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">${message}</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagination = () => {
  let paginationHTML = ``;
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;
  if (last > total_pages) {
    last = total_pages;
  }
  // let first = last - 4;
  let first = last - 4 <= 0 ? 1 : last - 4;

  // total page 3일 경우 3개의 페이지만 프린트 하는법 last, first
  // << >> 버튼 만들어 주기 (맨 처음, 맨 끝)
  // 내가 그룹 1일 때 << < 버튼이 없다.
  // 내가 마지막 그룹일 때 > >> 버튼이 없다.

  if (first >= 6) {
    paginationHTML = `
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick="moveToPage(${
          page - 1
        })">
          <span aria-hidden="true">&lt;</span>
        </a>
      </li>
    `;
  }

  for (let i = first; i <= last; i++) {
    paginationHTML += `<li class="page-item ${
      page == i ? "active" : ""
    }"><a class="page-link" href="#" onclick="moveToPage(${i})">${i}</a></li>`;
  }

  if (last < total_pages) {
    paginationHTML += `
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${
          page + 1
        })">
          <span aria-hidden="true">&gt;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" onclick="moveToPage(${total_pages})">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    `;
  }  

  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum;
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&topic=business&page_size=10`
  );

  getNews();
};

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();
