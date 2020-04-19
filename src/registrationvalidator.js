import "babel-core/register";
import "babel-polyfill";


window.emailStatus = false;
window.passwordStatus = false;
window.nameStatus = false;


const pushToDatabase = (userData) =>{
	try{
		const userDataObject = {
			"email": userData[0],
			"password": userData[1],
			"name": userData[2],
			"gender": userData[3] 
			};

	 fetch("http://localhost:8080/SocialMedia/register",{
				method: 'POST',
				mode: 'no-cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(userDataObject)
			}).then(response => response.json()).then(data => {

				console.log("reg ststus "+data["registerStatus"]);
				if(data["registerStatus"] == "true"){
					alert("Registration Successfull");
				}
				else{
					alert("Registration Unsuccessfull");
				}
			});
		}
	catch(e){
		console.log(e);
		return false;
	}
	
}
const controlButton = (statusToSet) => {
	let regButtonObject = document.getElementById("RegButton");
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

function checkName(nameIdentifier, formObject) {
	let nameObject = formObject[nameIdentifier];
	let nameValue = nameObject.value;
	if(nameValue.length == 0)
	{
		controlButton("i");
		setValidationStatus("i", nameIdentifier, nameObject, "Enter valid name e.g sam stancovic");
		return false;
	}
	else
	{
		let nameCorrect = true;
		for(let index in nameValue)
		{
			let theAscii = nameValue.charCodeAt(index); 
			if(theAscii >= 47 && theAscii <= 57 )
			{
				nameCorrect = false;
				controlButton("i");
				setValidationStatus("i", nameIdentifier, nameObject, "Enter valid name e.g sam stancovic");
				break;
			}
		}
		if(nameCorrect == true)
		{
			controlButton("v");
			setValidationStatus("v", nameIdentifier, nameObject);	
		}
		return nameCorrect;			
	}
}

function checkPassword(passwordIdentifier, formObject) {
	let passwordObject = formObject[passwordIdentifier];
	if(passwordObject.checkValidity())
	{
		controlButton("v");
		setValidationStatus("v", passwordIdentifier, passwordObject);
		unlockConfrimPassword(true);
		return true;
	}
	else
	{
		controlButton("i");
		setValidationStatus("i", passwordIdentifier, passwordObject,`Password must contains uppercase, lowercase letters with numbers
													and must be minimum of length 8`);
		unlockConfrimPassword(false);
		return false;
	}
}

const unlockConfrimPassword = (status) => {
	let theConfirmPasswordObject = document.forms["RegForm"]["TheCPassword"];
	theConfirmPasswordObject.disabled = !status;
}

function confrimPassword (confirmPasswordIdentifier,passwordIdentifier ,formObject) {
	let passwordObject = formObject[passwordIdentifier];
	let confirmPasswordObject = formObject[confirmPasswordIdentifier];
	if(passwordObject.value === confirmPasswordObject.value ){
		controlButton("v");
		setValidationStatus("v", confirmPasswordIdentifier, confirmPasswordObject);
	}
	else{
		controlButton("i");
		setValidationStatus("i", confirmPasswordIdentifier, confirmPasswordObject, "Enter the same password as above");	
	}
}
function storeDataNow()
{
	try {
		console.log("email status -> "+window.emailStatus);
		console.log("password status -> "+window.passwordStatus);
		console.log("name status -> "+window.nameStatus);
		if(window.emailStatus == true && window.passwordStatus == true && window.nameStatus == true)
		{
			const registrationFormObject = document.forms["RegForm"];
			const userEmail = registrationFormObject["TheEmail"].value;
			const userPassword  = registrationFormObject["ThePassword"].value;
			const userName = registrationFormObject["TheName"].value;
			const userGender = registrationFormObject["gender"].value;
			const pushStatus = pushToDatabase([userEmail, userPassword, userName, userGender]);
		}
		else 
		{
			alert("Registration Unsuccessfull");
		}
	} catch(e) {
		console.log("Exception is -> "+e.toString());
	}
}


(() => {
	window.storeDataNow = storeDataNow;
	let registrationFormObject = document.forms["RegForm"];
	let theNameObject = registrationFormObject["TheName"];
	let theEmailObject = registrationFormObject["TheEmail"]; 
	let thePasswordObject = registrationFormObject["ThePassword"];
	let theConfirmPasswordObject = registrationFormObject["TheCPassword"];
	
	theEmailObject.addEventListener("keyup",() => {
		window.emailStatus = checkEmailId("TheEmail", registrationFormObject);
		console.log(window.emailStatus);
	});

	theNameObject.addEventListener("keyup",() => {
		window.nameStatus = checkName("TheName", registrationFormObject);
		console.log(window.nameStatus);
	});

	thePasswordObject.addEventListener("keyup",() => {
		window.passwordStatus = checkPassword("ThePassword", registrationFormObject);
		console.log(window.passwordStatus);
	});

	theConfirmPasswordObject.addEventListener("keyup",() => {
		confrimPassword("TheCPassword", "ThePassword", registrationFormObject);
		console.log(window.emailStatus);
	});
	unlockConfrimPassword(false);
})();
	
