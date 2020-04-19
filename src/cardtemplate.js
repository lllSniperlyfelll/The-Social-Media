import "babel-core/register";
import "babel-polyfill";

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

const getcardHeader = (userName) => `<section class="card-header border-0 bg-dark text-white" style="margin-bottom: 0.5px">
                                        <section class="input-group">
                                            <section class="input-group-prepend">
                                                <img src="images/icons/user.svg" height="40px" width="40px">&nbsp;
                                            </section>
                                            <section class="h4 pt-1">${userName}</section>
                                        </section>
                                    </section>`;


const proccessTags = (comment) =>{
  let proccessedComment = "";
  for(let index = 0; index <= comment.length ; index++){
    if( (index + 1) <= comment.length &&  comment.charAt(index + 1) != null ){
      if(comment.charAt(index) == "#" && (comment.charAt(index + 1) != " ") ){
        proccessedComment += "<span class = 'text-primary'>#";
        while(comment.charAt(index) != " " && index <= comment.length){
          index += 1;
          proccessedComment += comment.charAt(index);
        }
        proccessedComment += "</span>";
      }
      else{
        proccessedComment += comment.charAt(index);
      }
    }
  }
  return proccessedComment;
}


const getcardBody = (Content) => `<section class="card-body bg-white custom-card">
                                    <section class="card-text ">
                                        <p class="line-cut  h5 font-weight-normal">${proccessTags(Content)}</p>
                                    </section>
                                  </section>`;





const getcardFooter = ( styledComments) => ` <section class="card-footer text-center p-0 custom-card " style="padding-bottom: 0px">
                                              <table class="table table-bordered table-active table-hover table-striped">
                                                <tbody>
                                                    <tr class="p-0">
                                                        <td class="pb-0 pt-0"><span style="font-size: 22px" class="text-danger"><i class="fa fa-heart"></i>&nbsp;</span></td>
                                                        <td class="pb-0 pt-0"><span style="font-size: 22px" class="text-gray-dark"><i class="fa fa-share"></i>&nbsp;</span></td>
                                                    </tr>
                                                </tbody>
                                              </table> ${styledComments}
                                            </section>`;





const getCommentInput = (postId) => `<section class="container-fluid mb-1">
                                      <section class="input-group ">
                                          <input type="text" id="${postId}" name="" class="form-control border-dark card shadow-sm " placeholder="Write Something here ... " style="font-size: 15px;border-radius: 50px">
                                          <button class="input-group-append bg-primary btn rounded-circle custom-card text-white ml-2" onclick = "commentPost('${postId}')">
                                            <span style="font-size: 15px"><i class="fa fa-paper-plane"></i></span></button>
                                      </section>
                                  </section>`;




const generateComments = (Comments) => {
  let commentsTemplate = "";
  for(let data in Comments){
    let [name, comment] = Comments[data];
    commentsTemplate += `<table  width="100%">
                          <tr>
                            <td rowspan="2" style="width: 12%;"> 
                              <img src="images/icons/user.svg" height="45px" width="50px" class="d-block custom-card rounded-circle">
                            </td>
                            <td class="text-left font-weight-bold text-primary"><span>${name}</span></td>
                          </tr>
                          <tr><td class="text-left"><span class="font-weight-normal">${proccessTags(comment)}</span></td></tr>
                        </table>`
  }
  return `<section class="jumbotron-fluid p-3">`+ commentsTemplate + `</section>`;
}



/* Do not forget to call this function finally when the whole card creation is complete
this packs the card finally into  card class and col into row rady to be injected into html 
*/
const packCard = (card) => `<section class="row bg-transparent mt-5">
                              <section class="col-md-7 mx-auto">
                                <section class="row">
                                  <section class="col-md-7 mx-auto">
                                     <section class="card shadow border-dark bg-transparent">${card}</section>
                                   </section>
                                  <section class="col-md-5 container mx-auto"><section class="jumbotron hide"></section></section>    
                                </section>                                     
                              </section>
                            </section>`;





export const getpostCard = (userName, Content, Comments, postId) => new Promise((resolve, reject) => {
  try{
    const cardHeader = getcardHeader(userName);
    const cardBody = getcardBody(Content);
    const genComments = generateComments(Comments)
    const genIp = getCommentInput(postId);
    const cardFooter = getcardFooter(genComments + genIp);
    resolve(packCard(cardHeader + cardBody + cardFooter));
  }catch(e){
    console.log(e);
    reject("Exception in generating card ");
  }
});



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
const getImageCardBody = (ImagePathhh, Caption, Tags) =>`
                                                        <img src="${ImagePathhh}" class="card-img-top d-block rounded-0 img-fluid">
                                                        <section class="card-body">
                                                            <section class="card-info text-primary font-weight-bold">${Tags}</section>
                                                            <section class="card-text">
                                                                <hr><p class="line-cut">${proccessTags(Caption)}</p>
                                                            </section>
                                                        </section>`;


export const getImagepostCard = (userName, ImagePath, Caption, Tags, Comments, postId) => new Promise((resolve, reject) => {
  try {
      const imageCardHeader = getcardHeader(userName);
      const imageCardBody = getImageCardBody(ImagePath, Caption, Tags);
      const genImageComments = generateComments(Comments);
      const genImageIp = getCommentInput(postId);
      const imageCardFooter = getcardFooter(genImageComments + genImageIp);
      resolve(packCard(imageCardHeader + imageCardBody + imageCardFooter));
  } catch(e) {
    console.log(e);
  }
});

