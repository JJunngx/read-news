"use strict";

const pageSizeInput = document.getElementById("input-page-size");
const categoryInput = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");

if (!currentUserLog) {
  alert("cần đăng nhập");
  throw new Error("cần đăng nhập");
}

// const currentUserSettings=currentUserLog.username
// storage settings
const userSettingsKey = "User_Settings";
let userSettings = JSON.parse(getFromStorage(userSettingsKey)) || {};

if (userSettings[currentUserLog.username]) {
  //hiển thị dữ liệu đã cài đặt
  pageSizeInput.value =
    Number(userSettings[currentUserLog.username].pageSize) || 5;
  categoryInput.value =
    userSettings[currentUserLog.username].category || "General";
} else {
  pageSizeInput.value = 5;
  categoryInput.value = "General";
}

btnSubmit.addEventListener("click", function () {
  const pageSize = Math.round(pageSizeInput.value);
  const category = categoryInput.value;
  if (!pageSize || !category || pageSize <= 0) {
    alert("khong hop le");
    throw new Error("khong hợp lệ");
  } else {
    //create  object storage settings
    userSettings[currentUserLog.username] = { pageSize, category };
    saveToStorage(userSettingsKey, JSON.stringify(userSettings));
    alert("success");
    location.reload();
  }
});
