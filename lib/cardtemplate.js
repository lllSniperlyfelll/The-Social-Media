"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImagepostCard = exports.getpostCard = void 0;

require("babel-core/register");

require("babel-polyfill");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
1. userName = name of the user who posted
2. Content = post
3. Comments = a array of array(having [commentor name, the comment]) e.g [ [user, comment], [user2, comment2] ]
4. postId = the unique id of post will set on comment button
*/

/* Sequence of function called
1. getcardHeader()
2. getcardBody()
3. const genComments = generateComments()
4. const genIp = getCommentInput()
5. getcardFooter(genComments + genIp)

Hence final code mus look like :-
const theCard = getcardHeader() + getcardBody() + getcardFooter( generateComments() + getCommentInput() ) 

final ready card will at packCard(theCard);
*/

/*
getpostCard() is exported and returns a promise
*/

/*Extended code: Added a some new functions to make card for Image Posts
Life cycle is:
1. getcardHeader() (RE-USED)
2. getImageCardBody()
3. const genComments = generateComments() (RE-USED)
4. const genIp = getCommentInput() (RE-USED)
5. getcardFooter(genComments + genIp) (RE-USED)
*/
var getcardHeader = function getcardHeader(userName) {
  return "<section class=\"card-header border-0 bg-dark text-white\" style=\"margin-bottom: 0.5px\">\n                                        <section class=\"input-group\">\n                                            <section class=\"input-group-prepend\">\n                                                <img src=\"images/icons/user.svg\" height=\"40px\" width=\"40px\">&nbsp;\n                                            </section>\n                                            <section class=\"h4 pt-1\">".concat(userName, "</section>\n                                        </section>\n                                    </section>");
};

var proccessTags = function proccessTags(comment) {
  var proccessedComment = "";

  for (var index = 0; index <= comment.length; index++) {
    if (index + 1 <= comment.length && comment.charAt(index + 1) != null) {
      if (comment.charAt(index) == "#" && comment.charAt(index + 1) != " ") {
        proccessedComment += "<span class = 'text-primary'>#";

        while (comment.charAt(index) != " " && index <= comment.length) {
          index += 1;
          proccessedComment += comment.charAt(index);
        }

        proccessedComment += "</span>";
      } else {
        proccessedComment += comment.charAt(index);
      }
    }
  }

  return proccessedComment;
};

var getcardBody = function getcardBody(Content) {
  return "<section class=\"card-body bg-white custom-card\">\n                                    <section class=\"card-text \">\n                                        <p class=\"line-cut  h5 font-weight-normal\">".concat(proccessTags(Content), "</p>\n                                    </section>\n                                  </section>");
};

var getcardFooter = function getcardFooter(styledComments) {
  return " <section class=\"card-footer text-center p-0 custom-card \" style=\"padding-bottom: 0px\">\n                                              <table class=\"table table-bordered table-active table-hover table-striped\">\n                                                <tbody>\n                                                    <tr class=\"p-0\">\n                                                        <td class=\"pb-0 pt-0\"><span style=\"font-size: 22px\" class=\"text-danger\"><i class=\"fa fa-heart\"></i>&nbsp;</span></td>\n                                                        <td class=\"pb-0 pt-0\"><span style=\"font-size: 22px\" class=\"text-gray-dark\"><i class=\"fa fa-share\"></i>&nbsp;</span></td>\n                                                    </tr>\n                                                </tbody>\n                                              </table> ".concat(styledComments, "\n                                            </section>");
};

var getCommentInput = function getCommentInput(postId) {
  return "<section class=\"container-fluid mb-1\">\n                                      <section class=\"input-group \">\n                                          <input type=\"text\" id=\"".concat(postId, "\" name=\"\" class=\"form-control border-dark card shadow-sm \" placeholder=\"Write Something here ... \" style=\"font-size: 15px;border-radius: 50px\">\n                                          <button class=\"input-group-append bg-primary btn rounded-circle custom-card text-white ml-2\" onclick = \"commentPost('").concat(postId, "')\">\n                                            <span style=\"font-size: 15px\"><i class=\"fa fa-paper-plane\"></i></span></button>\n                                      </section>\n                                  </section>");
};

var generateComments = function generateComments(Comments) {
  var commentsTemplate = "";

  for (var data in Comments) {
    var _Comments$data = _slicedToArray(Comments[data], 2),
        name = _Comments$data[0],
        comment = _Comments$data[1];

    commentsTemplate += "<table  width=\"100%\">\n                          <tr>\n                            <td rowspan=\"2\" style=\"width: 12%;\"> \n                              <img src=\"images/icons/user.svg\" height=\"45px\" width=\"50px\" class=\"d-block custom-card rounded-circle\">\n                            </td>\n                            <td class=\"text-left font-weight-bold text-primary\"><span>".concat(name, "</span></td>\n                          </tr>\n                          <tr><td class=\"text-left\"><span class=\"font-weight-normal\">").concat(proccessTags(comment), "</span></td></tr>\n                        </table>");
  }

  return "<section class=\"jumbotron-fluid p-3\">" + commentsTemplate + "</section>";
};
/* Do not forget to call this function finally when the whole card creation is complete
this packs the card finally into  card class and col into row rady to be injected into html 
*/


var packCard = function packCard(card) {
  return "<section class=\"row bg-transparent mt-5\">\n                              <section class=\"col-md-7 mx-auto\">\n                                <section class=\"row\">\n                                  <section class=\"col-md-7 mx-auto\">\n                                     <section class=\"card shadow border-dark bg-transparent\">".concat(card, "</section>\n                                   </section>\n                                  <section class=\"col-md-5 container mx-auto\"><section class=\"jumbotron hide\"></section></section>    \n                                </section>                                     \n                              </section>\n                            </section>");
};

var getpostCard = function getpostCard(userName, Content, Comments, postId) {
  return new Promise(function (resolve, reject) {
    try {
      var cardHeader = getcardHeader(userName);
      var cardBody = getcardBody(Content);
      var genComments = generateComments(Comments);
      var genIp = getCommentInput(postId);
      var cardFooter = getcardFooter(genComments + genIp);
      resolve(packCard(cardHeader + cardBody + cardFooter));
    } catch (e) {
      console.log(e);
      reject("Exception in generating card ");
    }
  });
};
/* ------------------------------------------------- Image Card Maker Section --------------------------------------------------------------------------------*/

/*
Fields in Image Card Post
1. String mmPostid 
2. String imagePath
3. String imageCaption 
4. String imageTags 
5. String userNameI 
6. String theComments 
*/


exports.getpostCard = getpostCard;

var getImageCardBody = function getImageCardBody(ImagePathhh, Caption, Tags) {
  return "\n                                                        <img src=\"".concat(ImagePathhh, "\" class=\"card-img-top d-block rounded-0 img-fluid\">\n                                                        <section class=\"card-body\">\n                                                            <section class=\"card-info text-primary font-weight-bold\">").concat(Tags, "</section>\n                                                            <section class=\"card-text\">\n                                                                <hr><p class=\"line-cut\">").concat(proccessTags(Caption), "</p>\n                                                            </section>\n                                                        </section>");
};

var getImagepostCard = function getImagepostCard(userName, ImagePath, Caption, Tags, Comments, postId) {
  return new Promise(function (resolve, reject) {
    try {
      var imageCardHeader = getcardHeader(userName);
      var imageCardBody = getImageCardBody(ImagePath, Caption, Tags);
      var genImageComments = generateComments(Comments);
      var genImageIp = getCommentInput(postId);
      var imageCardFooter = getcardFooter(genImageComments + genImageIp);
      resolve(packCard(imageCardHeader + imageCardBody + imageCardFooter));
    } catch (e) {
      console.log(e);
    }
  });
};

exports.getImagepostCard = getImagepostCard;