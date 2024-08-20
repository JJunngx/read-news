"use strict";

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const newsContainer = document.getElementById("news-container");
const pageNum = document.getElementById("page-num");
// buộc đăng nhập
if (!currentUserLog) {
  alert("cần đăng nhập ");
  throw new Error("cần đăng nhập  ");
}
// storage settings
let userSettings = JSON.parse(getFromStorage("User_Settings")) || {};

let currentPage = 1;
let pageSize = userSettings[currentUserLog.username]?.pageSize || 5; // Số bài viết hiển thị trên mỗi trang

let category = userSettings[currentUserLog.username]?.category || "General";

const apiKey = "da0f7f2138414ac0b04d9ac54cf741e4";

let totalResults = 0; // Số lượng bài viết tổng cộng

// bắt buộc đăng nhập

// Các dòng mã khác trong hàm

async function getNewsData(country, category, pageSize, page, apiKey) {
  const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    totalResults = data.totalResults; // Cập nhật tổng số lượng bài viết từ dữ liệu trả về
    return data;
  } catch (error) {
    console.log(error, "error");
    return null;
  }
}

// khai bao api
async function fetchNewsData() {
  const newsData = await getNewsData(
    "us",
    category,
    pageSize,
    currentPage,
    apiKey
  );
  displayNews(newsData);
}
// display data on browser  khi tai du lieu
window.onload = async function () {
  await fetchNewsData();
};

function displayNews(newsData) {
  // Xóa bài viết hiện tại trên trang
  newsContainer.innerHTML = "";

  if (!newsData || newsData.status !== "ok") {
    newsContainer.innerHTML = "Failed to fetch news data. ";
    return;
  }

  const articles = newsData.articles;

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
    await fetchNewsData();
  }
});

btnNext.addEventListener("click", async () => {
  const maxPage = Math.ceil(totalResults / pageSize);

  if (currentPage < maxPage) {
    currentPage++;
    await fetchNewsData();
  }
});
// }
