"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}
function getFromStorage(key) {
  return localStorage.getItem(key);
}
const currentUser = "USER-LOGIN";
const currentUserLog = JSON.parse(getFromStorage(currentUser)) || null;
