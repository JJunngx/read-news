"use strict";

const queryInput = document.getElementById("input-query");
const searchBtn = document.getElementById("btn-submit");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");
const pageNum = document.getElementById("page-num");

if (!currentUserLog) {
  alert("cần đăng nhập ");
  throw new Error("cần đăng nhập  ");
}
let userSettings = JSON.parse(getFromStorage("User_Settings")) || {};
const apiKey = "da0f7f2138414ac0b04d9ac54cf741e4";
let currentPage = 7; //
let totalResults = 0;
let pageSize = userSettings[currentUserLog.username]?.pageSize || 5; //
let category = userSettings[currentUserLog.username]?.category || "General";

console.log(category);

let query = "";
const country = "us";

if (!currentUserLog) {
  alert("cần đăng nhập ");
  throw new Error("cần đăng nhập  ");
}

searchBtn.addEventListener("click", async () => {
  query = queryInput.value.trim();
  //thông báo không có kết quả
  if (query !== "") {
    await searchNews(query, country, category, pageSize, currentPage, apiKey);
  } else if (!totalResults) {
    newsContainer.innerHTML = "No results were found";
    throw new Error("No results were found ");
  }
});

async function searchNews(query, country, category, pageSize, page, apiKey) {
  const apiUrl = `https://newsapi.org/v2/top-headlines?q=${query}&country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    totalResults = data.totalResults;

    displaySearchResults(data);
  } catch (error) {
    console.error("Error searching news:", error);
  }
}

function displaySearchResults(data) {
  newsContainer.innerHTML = "";

  if (!data || data.status !== "ok") {
    alert("Failed to fetch news data.");
    throw new Error("Failed to fetch news data.");
  }
  const articles = data.articles;
  // tao the chua du lieu duoc lay tu api
  for (const article of articles) {
    newsContainer.innerHTML += `
      <div class="card flex-row flex-wrap">
        <div class="card mb-3" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                src=${article?.urlToImage}
                class="card-img"
                alt="no image"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                  ${article?.title}
                </h5>
                <p class="card-text">
                  ${article?.description}
                </p>
                <a
                  href="${article?.url}"
                  class="btn btn-primary"
                  >View</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Cập nhật số trang hiện tại
  pageNum.innerText = currentPage;
  //xoa prev khi ở trang đầu
  btnPrev.style.display = currentPage === 1 ? "none" : "block";

  const maxPage = Math.ceil(totalResults / pageSize);

  //xóa next khi hêts data
  btnNext.style.display =
    currentPage === maxPage || totalResults === 0 ? "none" : "block";
}

btnPrev.addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage++;
    await searchNews(query, country, category, pageSize, currentPage, apiKey);
  }
});

btnNext.addEventListener("click", async () => {
  const maxPage = Math.ceil(totalResults / pageSize);

  if (currentPage < maxPage) {
    currentPage++;
    await searchNews(query, country, category, pageSize, currentPage, apiKey);
  }
});
