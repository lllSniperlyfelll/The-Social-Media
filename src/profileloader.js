import {getInfo} from "./datastorage.js";
import {cookieHandler} from "./cookiehandler.js";

import "babel-core/register";
import "babel-polyfill";



const setOutput = (usersData) => {
	const spanArray = [
	"NameSpan",
	"EmailSpan",
	"GenderSpan",
	"StatusSpan",
	"BlogSpan"];
	let index = 0;
	console.log(usersData);
	for(index = 0; index < 5; index++){
		let singleData = usersData[index];
		console.log("User info -> "+singleData);
		document.getElementById(spanArray[index]).innerHTML = singleData;
	}
}


const updateSession = (StatusData, BlogData) =>{
	if(StatusData != "Add your status"){
		sessionStorage.setItem("status", StatusData);
	}
	else if(BlogData != "Add your blog"){
	sessionStorage.setItem("blog",BlogData);
	}
	location.reload(true);
}

const updateInfo = (StatusData = "Add your status", BlogData="Add your blog") => {

	const cookieObj = new cookieHandler();

	if(StatusData != null && StatusData != "" && BlogData != null && BlogData != ""){
		console.log("Cookie from profile loader -> "+cookieObj.getCookie());
		const updateData = {
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
				}).then(response => response.json()).then(data => {
					console.log(data["updatestatus"]);
					if(data["updatestatus"] == "yes"){
						updateSession(StatusData, BlogData);
					}
					else{
						alert("Update failed");
					}
				});
		}
}



const limitStatusLen = (maxAllowance) =>{
	let enteredChars = document.getElementById("TheStatus").value.length;
	
	if(maxAllowance - enteredChars >= 0){
		document.getElementById("StatusSpan").innerHTML = document.getElementById("TheStatus").value;
		const mssgStr = `Number of characters allowded is atmost ${maxAllowance- enteredChars}`;
		document.getElementById("StatusMaxLengthWarning").innerHTML ="";
		document.getElementById("StatusMaxLengthWarning").innerHTML = mssgStr;	
	}
	else{
		const mssgStr = `Number of characters allowded is atmost 0`;
		document.getElementById("StatusMaxLengthWarning").innerHTML ="";
		document.getElementById("StatusMaxLengthWarning").innerHTML = mssgStr;	
	}
	
	if(enteredChars > maxAllowance){

		document.getElementById("StatusSaveBtn").disabled = true;
	}
	else{
		document.getElementById("StatusSaveBtn").disabled = false;	
	}
	
}


(()=>{
		const cookieObj = new cookieHandler();
	console.log("Cookie from profile loader -> "+cookieObj.getCookie());
	const usersData = getInfo();
	console.log(usersData.length);
	/*if(usersData[1] != undefined && usersData[1] != "" && usersData[1] != null)*/
	setOutput(usersData);
	window.updateInfo = updateInfo;
	document.getElementById("StatusMaxLengthWarning").innerHTML ="";
	document.getElementById("StatusMaxLengthWarning").innerHTML = `Number of characters allowded is atmost 80`;
	document.getElementById("TheStatus").addEventListener("keyup", () =>{
		limitStatusLen(80);
	})
})();