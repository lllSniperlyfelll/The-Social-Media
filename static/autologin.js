(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _cookiehandler = require("./cookiehandler.js");

var _datastorage = require("./datastorage.js");

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
        document.getElementById("indexUserName").innerHTML += userName;
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    open("http://localhost:8080/SocialMedia/auth_page.html", "_self");
  }
})();
},{"./cookiehandler.js":2,"./datastorage.js":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cookieHandler = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cookieHandler = /*#__PURE__*/function () {
  function cookieHandler() {
    _classCallCheck(this, cookieHandler);
  }

  _createClass(cookieHandler, [{
    key: "getCookieDate",

    /*This function handles thecreation of a cookie
    this creates cookie with username and the expiery date
    , cookies are valid for 1 week*/
    value: function getCookieDate(incFactor) {
      var date = new Date();
      date.setDate(date.getDate() + incFactor);
      return date.toUTCString();
    }
  }, {
    key: "extractUsername",
    value: function extractUsername(theCookie) {
      var rawCookie = decodeURIComponent(theCookie).split(";");
      var rawUsername = rawCookie[0];
      var userName = rawUsername.substring(rawUsername.indexOf("=") + 1, rawUsername.length);
      return userName;
    }
  }, {
    key: "createCookie",
    value: function createCookie(emailId) {
      try {
        var cookieEmail = emailId;
        var cookieExpiery = this.getCookieDate(7);
        console.log("Date for cookie -> " + cookieExpiery);
        var cookieData = encodeURIComponent("username=".concat(cookieEmail, ";expires=").concat(cookieExpiery));
        document.cookie = cookieData;
        console.log("The cookie -> " + document.cookie);
      } catch (e) {
        console.log("Error in creating cookie -> " + e.toString());
      }
    }
    /*This function deletes the cookie i.e delays the expiery
    of the cookie to back by one year*/

  }, {
    key: "deleteCookie",
    value: function deleteCookie(emailId) {
      var delayedDate = this.getCookieDate(-365);
      var cookieData = encodeURIComponent("username=;expires=".concat(delayedDate));
    }
  }, {
    key: "getCookie",
    value: function getCookie() {
      var theCookie = document.cookie;

      if (theCookie == null || theCookie == "" || theCookie == undefined) {
        return "na";
      } else {
        return this.extractUsername(theCookie);
      }
    }
  }]);

  return cookieHandler;
}();

exports.cookieHandler = cookieHandler;
},{}],3:[function(require,module,exports){
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
},{}]},{},[1]);
