import {cookieHandler} from "./cookiehandler.js";
import {setInfo} from "./datastorage.js";

import "babel-core/register";
import "babel-polyfill";


(() =>{
	const cookieHandlerObject = new cookieHandler();
	const userName = cookieHandlerObject.getCookie();
	console.log("Cookie at autologin -> "+userName);
	console.log("Login status -> "+sessionStorage.getItem("logedIn"));
	if(userName != "na" && sessionStorage.getItem("logedIn") == "true"){
		/*Fetch data from servlet and store into Storage class*/
		try{
		fetch("http://localhost:8080/SocialMedia/profile", {
				method: 'POST',
				mode: 'no-cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email: userName})
			}).then(response => response.json()).then(Itr => {
				console.log("Setting user data from autologin");
				setInfo(Itr["name"], Itr["email"], Itr["gender"], Itr["status"],Itr["blog"]);
			});
		}
		catch(e){
			console.log(e);
		}
	}
	else {
		open("http://localhost:8080/SocialMedia/","_self");
	}
})();


