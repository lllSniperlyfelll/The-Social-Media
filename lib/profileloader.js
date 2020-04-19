"use strict";

var _datastorage = require("./datastorage.js");

var _cookiehandler = require("./cookiehandler.js");

require("babel-core/register");

require("babel-polyfill");

var setOutput = function setOutput(usersData) {
  var spanArray = ["NameSpan", "EmailSpan", "GenderSpan", "StatusSpan", "BlogSpan"];
  var index = 0;
  console.log(usersData);

  for (index = 0; index < 5; index++) {
    var singleData = usersData[index];
    console.log("User info -> " + singleData);
    document.getElementById(spanArray[index]).innerHTML = singleData;
  }
};

var updateSession = function updateSession(StatusData, BlogData) {
  if (StatusData != "Add your status") {
    sessionStorage.setItem("status", StatusData);
  } else if (BlogData != "Add your blog") {
    sessionStorage.setItem("blog", BlogData);
  }

  location.reload(true);
};

var updateInfo = function updateInfo() {
  var StatusData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Add your status";
  var BlogData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Add your blog";
  var cookieObj = new _cookiehandler.cookieHandler();

  if (StatusData != null && StatusData != "" && BlogData != null && BlogData != "") {
    console.log("Cookie from profile loader -> " + cookieObj.getCookie());
    var updateData = {
      email: cookieObj.getCookie(),
      status: StatusData,
      blog: BlogData
    };
    fetch("http://localhost:8080/SocialMedia/profileU", {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data["updatestatus"]);

      if (data["updatestatus"] == "yes") {
        updateSession(StatusData, BlogData);
      } else {
        alert("Update failed");
      }
    });
  }
};

var limitStatusLen = function limitStatusLen(maxAllowance) {
  var enteredChars = document.getElementById("TheStatus").value.length;

  if (maxAllowance - enteredChars >= 0) {
    document.getElementById("StatusSpan").innerHTML = document.getElementById("TheStatus").value;
    var mssgStr = "Number of characters allowded is atmost ".concat(maxAllowance - enteredChars);
    document.getElementById("StatusMaxLengthWarning").innerHTML = "";
    document.getElementById("StatusMaxLengthWarning").innerHTML = mssgStr;
  } else {
    var _mssgStr = "Number of characters allowded is atmost 0";
    document.getElementById("StatusMaxLengthWarning").innerHTML = "";
    document.getElementById("StatusMaxLengthWarning").innerHTML = _mssgStr;
  }

  if (enteredChars > maxAllowance) {
    document.getElementById("StatusSaveBtn").disabled = true;
  } else {
    document.getElementById("StatusSaveBtn").disabled = false;
  }
};

(function () {
  var cookieObj = new _cookiehandler.cookieHandler();
  console.log("Cookie from profile loader -> " + cookieObj.getCookie());
  var usersData = (0, _datastorage.getInfo)();
  console.log(usersData.length);
  /*if(usersData[1] != undefined && usersData[1] != "" && usersData[1] != null)*/

  setOutput(usersData);
  window.updateInfo = updateInfo;
  document.getElementById("StatusMaxLengthWarning").innerHTML = "";
  document.getElementById("StatusMaxLengthWarning").innerHTML = "Number of characters allowded is atmost 80";
  document.getElementById("TheStatus").addEventListener("keyup", function () {
    limitStatusLen(80);
  });
})();