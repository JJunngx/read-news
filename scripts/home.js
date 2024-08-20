"use strict";

// const currentUser = "USER-LOGIN";
// const currentUserLog = JSON.parse(getFromStorage(currentUser)) || null;

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

// Nếu người dùng đã đăng nhập
if (currentUserLog !== null) {
  // welcome you
  welcomeMessage.innerText = "Welcome " + currentUserLog.firstName;
  //hidden login and regiter
  loginModal.style.display = "none";
} else {
  mainContent.style.display = "none";
  // Ẩn nút Logout
  btnLogout.style.display = "none";
}
// Xử lý sự kiện click nút Logout
btnLogout.addEventListener("click", function () {
  window.location.href = "../pages/login.html";
  localStorage.removeItem(currentUser);
});
