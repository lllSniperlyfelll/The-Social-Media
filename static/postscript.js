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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var postTextData = function postTextData(mssg) {
  var cookieHandlerObject = new _cookiehandler.cookieHandler();
  var userName = "kjbkjn";

  if (userName != null && userName != "" && userName != undefined) {
    var userPost = {
      email: "test@test.com",
      userpost: mssg
    };

    try {
      fetch("http://localhost:8080/SocialMedia/npost", {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userPost)
      }).then(function (response) {
        return response.json();
      }).then(function (Itr) {
        console.log(Itr.posted_status);

        if (Itr.posted_status == "posteddata") {
          alert("Post Successfully");
        } else {
          alert("Not posted");
        }
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("You Cannot post until you login");
  }
};

var commentPost = function commentPost(postId) {
  console.log("COmmented on post id -> " + postId);
  var cookieHandlerObject = new _cookiehandler.cookieHandler();
  var userName = "commenting user";
  var theCommentByUser = document.getElementById(postId).value;

  if (theCommentByUser != "" && theCommentByUser != null && theCommentByUser.length > 1) {
    if (userName != null && userName != "" && userName != undefined) {
      var userPost = {
        email: "test@test.com",
        postid: postId,
        comments: theCommentByUser
      };

      try {
        fetch("http://localhost:8080/SocialMedia/comment", {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userPost)
        }).then(function (response) {
          return response.json();
        }).then(function (Itr) {
          console.log(Itr.posted_status);
          open("http://localhost:8080/SocialMedia/index.html", "_self");
          alert(Itr.comment_status);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("You Cannot post until you login");
    }
  }
};

var pushImage = function pushImage(imageData) {
  fetch("http://localhost:8080/SocialMedia/mmpost", {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(imageData)
  }).then(function (response) {
    return response.json();
  }).then(function (Itr) {
    console.log(Itr.posted_status);
    open("http://localhost:8080/SocialMedia/index.html", "_self");
    alert(Itr.posted_status);
  });
};

var uploadMultimedia = function uploadMultimedia(formName) {
  var imageCaption = document.getElementById("ImageCaption").value;
  var imageTags = document.getElementById("ImageTags").value;
  console.log(_typeof(imageCaption));
  console.log(imageTags.length);
  console.log(imageFileName);
  var imagePostData = {
    imagePath: window.imageFileName == null || window.imageFileName == "" || window.imageFileName.length < 1 ? "na" : window.imageFileName,
    email: "test@test.com",
    caption: imageCaption == null || imageCaption == "" || imageCaption.length < 1 ? "na" : imageCaption,
    imageTags: imageTags == null || imageTags == "" || imageTags.length < 1 ? "na" : imageTags
  };
  pushImage(imagePostData);
};

(function () {
  window.commentPost = commentPost;
  window.uploadMultimedia = uploadMultimedia;
  window.imageFileName = "";
  document.getElementById("textPostBtn").addEventListener("click", function () {
    var thePost = document.getElementById("textPost").value;
    thePost == null || thePost == "" || thePost == undefined ? alert("This cannot be posted") : postTextData(thePost);
  });
  document.getElementById("imagePost").addEventListener("change", function () {
    var theImageFile = document.getElementById("imagePost");
    var fr = new FileReader();

    fr.onload = function () {
      document.getElementById("imgPreview").src = fr.result;
      window.imageFileName = theImageFile.files[0].name;
      document.getElementById("imagePostLabel").innerHTML = theImageFile.files[0].name;
    };

    fr.readAsDataURL(theImageFile.files[0]);
  });
})();
},{"./cookiehandler.js":1}]},{},[2]);
