"use strict";

require("babel-core/register");

require("babel-polyfill");

var _cardtemplate = require("./cardtemplate");

var getAllPosts = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var allPosts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch("http://localhost:8080/SocialMedia/SendAllData", {
              method: 'POST',
              mode: 'no-cors',
              cache: 'no-cache',
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 3:
            allPosts = _context.sent;
            return _context.abrupt("return", allPosts);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log("EXception in fetching all posts -> ", _context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getAllPosts() {
    return _ref.apply(this, arguments);
  };
}();

var getCards = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(postedBy, thePostis, finalComments, postKey) {
    var theCardGot;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _cardtemplate.getpostCard)(postedBy, thePostis, finalComments, postKey);

          case 3:
            theCardGot = _context2.sent;
            return _context2.abrupt("return", theCardGot);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", _context2.t0.String());

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getCards(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getImageCards = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userName, ImagePath, Caption, Tags, Comments, postId) {
    var theImageCardGot;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _cardtemplate.getImagepostCard)(userName, ImagePath, Caption, Tags, Comments, postId);

          case 3:
            theImageCardGot = _context3.sent;
            return _context3.abrupt("return", theImageCardGot);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", _context3.t0.String());

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function getImageCards(_x5, _x6, _x7, _x8, _x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _PARENT = "ParentContainer";

var pushToDisplay = function pushToDisplay(posts) {
  return document.getElementById(_PARENT).innerHTML += posts;
};

var proccessCommentsUsersArray = function proccessCommentsUsersArray(rawString) {
  var mainArray = rawString.split("__&&__");
  mainArray.pop();
  var finalArray = [];

  for (var itr in mainArray) {
    var temp = mainArray[itr].split("?&?");
    finalArray.push(temp);
  }

  return finalArray;
};

var extractImageData = function extractImageData(imageDataObject) {
  /*
      multimediaPostData.put(postId, mmPostid);
      multimediaPostData.put(imgPath, imagePath);
      multimediaPostData.put(caption, imageCaption);
      multimediaPostData.put(tagsMeta, imageTags);
      multimediaPostData.put(user_name, userNameI);
      multimediaPostData.put(comment, theComments);
  */
  var postId = imageDataObject["postid"];
  var postImagePath = imageDataObject["imagepath"];
  var postImageCaption = imageDataObject["caption"];
  var postImageTags = imageDataObject["imgtags"];
  var postImageUserName = imageDataObject["userName"];
  var postImageComments = imageDataObject["comments"] == null || imageDataObject["comments"] == "" || imageDataObject["comments"].length < 1 ? "" : proccessCommentsUsersArray(imageDataObject["comments"]);
  getImageCards(postImageUserName, postImagePath, postImageCaption, postImageTags, postImageComments, postId).then(function (resp) {
    return pushToDisplay(resp);
  });
};

var extractTextData = function extractTextData(textDataObject) {
  var postKey = textDataObject["postid"];
  var postedBy = textDataObject["userName"];
  var thePostis = textDataObject["thepost"];
  var allComments = textDataObject["comments"] == null || textDataObject["comments"] == "" || textDataObject["comments"].length < 1 ? "" : proccessCommentsUsersArray(textDataObject["comments"]);
  getCards(postedBy, thePostis, allComments, postKey).then(function (response) {
    return pushToDisplay(response);
  });
};

(function () {
  getAllPosts().then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);

    for (var key in data) {
      var singleData = data[key];

      if (singleData["posttype"] == "mmposts") {
        extractImageData(singleData);
      } else {
        extractTextData(singleData);
      }
    }
  });
  console.log("Loading posts");
})();