"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInfo = exports.setInfo = void 0;

var setInfo = function setInfo() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "na";
  var email = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "na";
  var gender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "na";
  var status = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "na";
  var blog = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "na";
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("gender", gender);
  sessionStorage.setItem("status", status);
  sessionStorage.setItem("blog", blog);
  console.log([sessionStorage.getItem("name"), sessionStorage.getItem("email"), sessionStorage.getItem("gender"), sessionStorage.getItem("status"), sessionStorage.getItem("blog")]);
};

exports.setInfo = setInfo;

var getInfo = function getInfo() {
  var userDataPack = [sessionStorage.getItem("name"), sessionStorage.getItem("email"), sessionStorage.getItem("gender"), sessionStorage.getItem("status"), sessionStorage.getItem("blog")];
  console.log("User data from getInfo -> " + userDataPack);
  return userDataPack;
};

exports.getInfo = getInfo;