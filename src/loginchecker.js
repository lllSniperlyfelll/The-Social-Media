import {cookieHandler} from "./cookiehandler.js";

const controlButton = (statusToSet) => {
	let regButtonObject = document.getElementById("LoginButton");
	if(statusToSet == "i")
		regButtonObject.disabled = true;
	else
		regButtonObject.disabled = false;
}

function setValidationStatus (statusToSet, elementIdentifier, elementObject, mssg = "Correct") {
	let theElementObject = document.getElementById(elementIdentifier+"ValidationSection");
	if(statusToSet == "i")
	{
		controlButton(statusToSet);
		elementObject.classList.remove("is-valid");
		elementObject.classList.add("is-invalid");
		theElementObject.classList.remove("text-muted");
		theElementObject.classList.remove("text-success");
		theElementObject.classList.add("invalid-feedback");
		theElementObject.innerHTML="";
		theElementObject.innerHTML=`<i class='fa fa-times'></i>&nbsp;${mssg}`;
	}
	else
	{
		controlButton(statusToSet);
		elementObject.classList.remove("is-invalid");
		elementObject.classList.add("is-valid");
		theElementObject.classList.remove("text-muted");
		theElementObject.classList.add("valid-feedback");
		theElementObject.classList.add("text-success");
		theElementObject.innerHTML="";
		theElementObject.innerHTML=`<i class='fa fa-check-square-o'></i>&nbsp;${mssg}`;	
	}	
}


function checkEmailId(emailIdentifier, formObject) {
	let emailValid = true;
	let emailObject = formObject[emailIdentifier];
	let theEmailValue = emailObject.value;
	let atRateSymPosition =  theEmailValue.indexOf("@");
	let dotSymPosition = theEmailValue.lastIndexOf(".");
	let emailLength = theEmailValue.length;
	if(atRateSymPosition == 0 || atRateSymPosition == -1 || dotSymPosition == 0 || dotSymPosition == -1)
	{
		controlButton("i");
		setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
		emailValid = false;
	}
	else if ((dotSymPosition - atRateSymPosition)<=2)
	{
		emailValid = false;
		controlButton("i");
		setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
	}
	else if(atRateSymPosition == emailLength-1)
	{
		emailValid = false;
		controlButton("i");
		setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
	}
	else if(dotSymPosition == emailLength - 1)
	{
		emailValid = false;
		controlButton("i");
		setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
	}
	else
	{
		controlButton("v");
		setValidationStatus("v", emailIdentifier, emailObject);
		emailValid = true;
	}
	return emailValid;
}



function allowLogin () {
	let loginFormObject = document.forms["LoginForm"];
	let theEmailValue = loginFormObject["TheLoginEmail"].value; 
	let thePasswordValue = loginFormObject["TheLoginPassword"].value;

	if(theEmailValue != null && thePasswordValue != null && theEmailValue != "" && thePasswordValue != ""){

		fetch("http://localhost:8080/SocialMedia/ulogin",{
				method: 'POST',
				mode: 'no-cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email: theEmailValue, authkey: thePasswordValue})
			}).then(response => response.json()).then(allowAccess =>{
				console.log("Allow login val -> "+allowAccess["loginaccess"]);
				if(allowAccess["loginaccess"] == "allow"){
					new cookieHandler().createCookie(theEmailValue);
					sessionStorage.setItem("logedIn",true);	
					console.log("login status from loginchecker -> "+sessionStorage.getItem("logedIn"));
					alert("Login success full");
					open("http://localhost:8080/SocialMedia/index.html","_self");				
				}
				else{
					alert("Error in login - Check email and password");	
				}
			});
	}
	else{
		alert("Error in login - Check email and password");
	}	
}

( () => {
	window.allowLogin = allowLogin;
	controlButton("i");
	document.forms["LoginForm"]["TheLoginEmail"].addEventListener("keyup",()=>{
		checkEmailId("TheLoginEmail",document.forms["LoginForm"]);
	});

})();
	
