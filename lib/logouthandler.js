"use strict";

var _cookiehandler = require("./cookiehandler.js");

var signOut = function signOut() {
  new _cookiehandler.cookieHandler().deleteCookie();
  sessionStorage.setItem("logedIn", false);
  window.open("http://localhost:8080/SocialMedia/", "_self");
};

(function () {
  window.signOut = signOut;
})();