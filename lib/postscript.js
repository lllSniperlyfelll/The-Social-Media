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