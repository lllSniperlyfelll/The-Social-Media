import {cookieHandler} from "./cookiehandler.js";




const postTextData = (mssg) =>{
	const cookieHandlerObject = new cookieHandler();
	const userName = "kjbkjn";
	if(userName != null && userName != "" && userName != undefined){
		const userPost = {
			email: "test@test.com",
			userpost: mssg
		}
		try{
		fetch("http://localhost:8080/SocialMedia/npost", {
				method: 'POST',
				mode: 'no-cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userPost)
			}).then(response => response.json()).then(Itr => {
				console.log(Itr.posted_status);
				if(Itr.posted_status == "posteddata"){
					alert("Post Successfully");
				}
				else{
					alert("Not posted");
				}
			});
		}
		catch(e){
			console.log(e);
		}
	}else{
		alert("You Cannot post until you login");
	}
}


const commentPost = (postId) =>{
	console.log("COmmented on post id -> "+postId);
	const cookieHandlerObject = new cookieHandler();
	const userName = "commenting user";
	const theCommentByUser = document.getElementById(postId).value;
	if(theCommentByUser != "" && theCommentByUser != null && theCommentByUser.length > 1)
	{
		if(userName != null && userName != "" && userName != undefined){
			const userPost = {
				email: "test@test.com",
				postid: postId,
				comments : theCommentByUser
			}
			try{
			fetch("http://localhost:8080/SocialMedia/comment", {
					method: 'POST',
					mode: 'no-cors',
					cache: 'no-cache',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(userPost)
				}).then(response => response.json()).then(Itr => {
					console.log(Itr.posted_status);
					open("http://localhost:8080/SocialMedia/index.html","_self");
					alert(Itr.comment_status);
				});
			}
			catch(e){
				console.log(e);
			}
		}else{
			alert("You Cannot post until you login");
		}
	}
}



const pushImage = (imageData) => {
	fetch("http://localhost:8080/SocialMedia/mmpost", {
					method: 'POST',
					mode: 'no-cors',
					cache: 'no-cache',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(imageData)
				}).then(response => response.json()).then(Itr => {
					console.log(Itr.posted_status);
					open("http://localhost:8080/SocialMedia/index.html","_self");
					alert(Itr.posted_status);
				});
}


const uploadMultimedia = (formName) =>{
	const imageCaption = document.getElementById("ImageCaption").value;
	const imageTags = document.getElementById("ImageTags").value;
	console.log(typeof imageCaption);
	console.log(imageTags.length);
	console.log(imageFileName);
	const imagePostData = {
			imagePath: (window.imageFileName == null || window.imageFileName == "" || window.imageFileName.length < 1) ? ("na"):(window.imageFileName),
			email: "test@test.com",
			caption: (imageCaption == null || imageCaption == "" || imageCaption.length < 1) ? ("na"):(imageCaption),
			imageTags : (imageTags == null || imageTags == "" || imageTags.length < 1) ? ("na"):(imageTags)
		}
	pushImage(imagePostData);
}




(() => {

	window.commentPost = commentPost;
	window.uploadMultimedia = uploadMultimedia;
	window.imageFileName = "";

	document.getElementById("textPostBtn").addEventListener("click", () =>{
		const thePost = document.getElementById("textPost").value;
		(thePost == null || thePost == "" || thePost == undefined)? (alert("This cannot be posted")):(postTextData(thePost));
	});

	document.getElementById("imagePost").addEventListener("change", () =>{
		const theImageFile = document.getElementById("imagePost");
		let fr = new FileReader();
		fr.onload = () => {
			document.getElementById("imgPreview").src = fr.result;
			window.imageFileName =  theImageFile.files[0].name;
			document.getElementById("imagePostLabel").innerHTML = theImageFile.files[0].name;
		}
		fr.readAsDataURL(theImageFile.files[0]);
	});

})
();