import "babel-core/register";
import "babel-polyfill";

import {getpostCard, getImagepostCard} from "./cardtemplate";


const _PARENT = "ParentContainer";

async function getAllPosts () {
  try {
    const allPosts = await fetch("http://localhost:8080/SocialMedia/SendAllData",{
        method: 'POST',
				mode: 'no-cors',
        cache: 'no-cache',
        headers: {
					'Content-Type': 'application/json'
				}
    });
    return allPosts;  
  } catch (error) {
    console.log("EXception in fetching all posts -> ",error);
  }
}

const pushToDisplay = (posts) => document.getElementById(_PARENT).innerHTML += posts;


const proccessCommentsUsersArray = (rawString) =>{
  let mainArray = rawString.split("__&&__");
  mainArray.pop();
  let finalArray = [];
  for(let itr in mainArray){
    const temp = mainArray[itr].split("?&?");
    finalArray.push(temp);
  }
  return finalArray;
}


async function getCards(postedBy, thePostis, finalComments, postKey){
    try{
      const theCardGot = await getpostCard(postedBy, thePostis, finalComments, postKey);
      return theCardGot;
    }catch(e){
      return e.String();
    }
}

async function getImageCards(userName, ImagePath, Caption, Tags, Comments, postId){
    try{
      const theImageCardGot = await getImagepostCard(userName, ImagePath, Caption, Tags, Comments, postId);
      return theImageCardGot;
    }catch(e){
      return e.String();
    }
}



const extractImageData = (imageDataObject) =>{
  /*
      multimediaPostData.put(postId, mmPostid);
      multimediaPostData.put(imgPath, imagePath);
      multimediaPostData.put(caption, imageCaption);
      multimediaPostData.put(tagsMeta, imageTags);
      multimediaPostData.put(user_name, userNameI);
      multimediaPostData.put(comment, theComments);
  */
  const postId = imageDataObject["postid"];
  const postImagePath = imageDataObject["imagepath"];
  const postImageCaption = imageDataObject["caption"];
  const postImageTags = imageDataObject["imgtags"];
  const postImageUserName = imageDataObject["userName"];
  const postImageComments = (imageDataObject["comments"] == null || imageDataObject["comments"] == "" || imageDataObject["comments"].length < 1 ) ? 
  (""):(proccessCommentsUsersArray(imageDataObject["comments"]));
  getImageCards(postImageUserName, postImagePath, postImageCaption, postImageTags, postImageComments, postId).then((resp) => pushToDisplay(resp));

}

const extractTextData = (textDataObject) =>{
  const postKey = textDataObject["postid"];
  const postedBy = textDataObject["userName"];
  const thePostis = textDataObject["thepost"];
  const allComments = (textDataObject["comments"] == null || textDataObject["comments"] == "" || textDataObject["comments"].length < 1 ) ? 
  (""):(proccessCommentsUsersArray(textDataObject["comments"]));
  getCards(postedBy, thePostis, allComments, postKey).then((response) => pushToDisplay(response));
}


(() => {
    getAllPosts().then(response =>response.json()).then(data => {
     console.log(data);
     for(let key in data){
       const singleData = data[key];
       if( singleData["posttype"] == "mmposts"){
         extractImageData(singleData);
       }else{
         extractTextData(singleData);
       }
     }
    });
    console.log("Loading posts");
})();
