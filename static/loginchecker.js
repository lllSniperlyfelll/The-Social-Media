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

var controlButton = function controlButton(statusToSet) {
  var regButtonObject = document.getElementById("LoginButton");
  if (statusToSet == "i") regButtonObject.disabled = true;else regButtonObject.disabled = false;
};

function setValidationStatus(statusToSet, elementIdentifier, elementObject) {
  var mssg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Correct";
  var theElementObject = document.getElementById(elementIdentifier + "ValidationSection");

  if (statusToSet == "i") {
    controlButton(statusToSet);
    elementObject.classList.remove("is-valid");
    elementObject.classList.add("is-invalid");
    theElementObject.classList.remove("text-muted");
    theElementObject.classList.remove("text-success");
    theElementObject.classList.add("invalid-feedback");
    theElementObject.innerHTML = "";
    theElementObject.innerHTML = "<i class='fa fa-times'></i>&nbsp;".concat(mssg);
  } else {
    controlButton(statusToSet);
    elementObject.classList.remove("is-invalid");
    elementObject.classList.add("is-valid");
    theElementObject.classList.remove("text-muted");
    theElementObject.classList.add("valid-feedback");
    theElementObject.classList.add("text-success");
    theElementObject.innerHTML = "";
    theElementObject.innerHTML = "<i class='fa fa-check-square-o'></i>&nbsp;".concat(mssg);
  }
}

function checkEmailId(emailIdentifier, formObject) {
  var emailValid = true;
  var emailObject = formObject[emailIdentifier];
  var theEmailValue = emailObject.value;
  var atRateSymPosition = theEmailValue.indexOf("@");
  var dotSymPosition = theEmailValue.lastIndexOf(".");
  var emailLength = theEmailValue.length;

  if (atRateSymPosition == 0 || atRateSymPosition == -1 || dotSymPosition == 0 || dotSymPosition == -1) {
    controlButton("i");
    setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
    emailValid = false;
  } else if (dotSymPosition - atRateSymPosition <= 2) {
    emailValid = false;
    controlButton("i");
    setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
  } else if (atRateSymPosition == emailLength - 1) {
    emailValid = false;
    controlButton("i");
    setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
  } else if (dotSymPosition == emailLength - 1) {
    emailValid = false;
    controlButton("i");
    setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
  } else {
    controlButton("v");
    setValidationStatus("v", emailIdentifier, emailObject);
    emailValid = true;
  }

  return emailValid;
}

function allowLogin() {
  var loginFormObject = document.forms["LoginForm"];
  var theEmailValue = loginFormObject["TheLoginEmail"].value;
  var thePasswordValue = loginFormObject["TheLoginPassword"].value;

  if (theEmailValue != null && thePasswordValue != null && theEmailValue != "" && thePasswordValue != "") {
    fetch("http://localhost:8080/SocialMedia/ulogin", {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: theEmailValue,
        authkey: thePasswordValue
      })
    }).then(function (response) {
      return response.json();
    }).then(function (allowAccess) {
      console.log("Allow login val -> " + allowAccess["loginaccess"]);

      if (allowAccess["loginaccess"] == "allow") {
        new _cookiehandler.cookieHandler().createCookie(theEmailValue);
        sessionStorage.setItem("logedIn", true);
        console.log("login status from loginchecker -> " + sessionStorage.getItem("logedIn"));
        alert("Login success full");
        open("http://localhost:8080/SocialMedia/index.html", "_self");
      } else {
        alert("Error in login - Check email and password");
      }
    });
  } else {
    alert("Error in login - Check email and password");
  }
}

(function () {
  window.allowLogin = allowLogin;
  controlButton("i");
  document.forms["LoginForm"]["TheLoginEmail"].addEventListener("keyup", function () {
    checkEmailId("TheLoginEmail", document.forms["LoginForm"]);
  });
})();
},{"./cookiehandler.js":1}]},{},[2]);
