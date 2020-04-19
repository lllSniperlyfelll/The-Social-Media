"use strict";

var _cookiehandler = require("./cookiehandler.js");

var _datastorage = require("./datastorage.js");

require("babel-core/register");

require("babel-polyfill");

(function () {
  var cookieHandlerObject = new _cookiehandler.cookieHandler();
  var userName = cookieHandlerObject.getCookie();
  console.log("Cookie at autologin -> " + userName);
  console.log("Login status -> " + sessionStorage.getItem("logedIn"));

  if (userName != "na" && sessionStorage.getItem("logedIn") == "true") {
    /*Fetch data from servlet and store into Storage class*/
    try {
      fetch("http://localhost:8080/SocialMedia/profile", {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userName
        })
      }).then(function (response) {
        return response.json();
      }).then(function (Itr) {
        console.log("Setting user data from autologin");
        (0, _datastorage.setInfo)(Itr["name"], Itr["email"], Itr["gender"], Itr["status"], Itr["blog"]);
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    open("http://localhost:8080/SocialMedia/", "_self");
  }
})();