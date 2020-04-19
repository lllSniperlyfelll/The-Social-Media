(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{"./cookiehandler.js":1}]},{},[2]);
