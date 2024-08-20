"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");
const passwordInputConfirm = document.getElementById("input-password-confirm");

const KEY = "USER_ARRAY";
const userArr = JSON.parse(getFromStorage(KEY)) || [];

btnSubmit.addEventListener("click", handleRegister);
// get data user

//
function handleRegister() {
  // Lấy dữ liệu nhập vào từ form

  // goi ham du lieu hop le
  const data = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    passwordConfirm: passwordInputConfirm.value,
  };
  const isValid = validate();

  if (isValid) {
    const newUser = new User(
      data.firstName,
      data.lastName,
      data.username,
      data.password
    );

    userArr.push(newUser);
    saveToStorage(KEY, JSON.stringify(userArr));

    window.location.href = "../pages/login.html";
  }
  function validate() {
    const existuser = userArr.find((user) => user.username === data.username);

    if (
      !data.firstName ||
      !data.lastName ||
      !data.username ||
      !data.password ||
      !data.passwordConfirm
    ) {
      alert("please fill data ");
    } else if (existuser) {
      alert("nguoi dung da ton tai");
    } else if (data.password.length < 8) {
      alert("mk có ít nhất 8 kí tự");
    } else if (data.password !== data.passwordConfirm) {
      alert("mk va xac nhan mk khong giong nhau");
    } else {
      return true;
    }
  }
}

//function declaration validate
