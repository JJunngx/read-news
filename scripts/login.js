"use strict";

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

const btnSubmitLogin = document.getElementById("btn-submit");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");

btnSubmitLogin.addEventListener("click", function handleLogin() {
  // get data
  const data = {
    username: usernameInput.value,
    password: passwordInput.value,
  };
  const valid = validate();

  if (valid) {
    //search data  user
    const finddata = userArr.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );
    // storage and tranfer page
    if (finddata) {
      saveToStorage(currentUser, JSON.stringify(finddata));
      window.location.href = "../index.html";
    } else {
      alert("fail login ");
    }
  }

  //validate
  function validate() {
    if (!data.username || !data.password) {
      alert("please fill data");
      return false;
    }
    return true;
  }
});
