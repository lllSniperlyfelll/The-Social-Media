"use strict";

require("babel-core/register");

require("babel-polyfill");

window.emailStatus = false;
window.passwordStatus = false;
window.nameStatus = false;

var pushToDatabase = function pushToDatabase(userData) {
  try {
    var userDataObject = {
      "email": userData[0],
      "password": userData[1],
      "name": userData[2],
      "gender": userData[3]
    };
    fetch("http://localhost:8080/SocialMedia/register", {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDataObject)
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log("reg ststus " + data["registerStatus"]);

      if (data["registerStatus"] == "true") {
        alert("Registration Successfull");
      } else {
        alert("Registration Unsuccessfull");
      }
    });
  } catch (e) {
    console.log(e);
    return false;
  }
};

var controlButton = function controlButton(statusToSet) {
  var regButtonObject = document.getElementById("RegButton");
  if (statusToSet == "i") regButtonObject.disabled = true;else regButtonObject.disabled = false;
};

function setValidationStatus(statusToSet, elementIdentifier, elementObject) {
  var mssg = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Correct";
  var theElementObject = document.getElementById(elementIdentifier + "ValidationSection");

  if (statusToSet == "i") {
    controlButton(statusToSet);
    elementObject.classList.remove("is-valid");
    elementObject.classList.add("is-invalid");
    theElementObject.classList.remove("text-muted");
    theElementObject.classList.remove("text-success");
    theElementObject.classList.add("invalid-feedback");
    theElementObject.innerHTML = "";
    theElementObject.innerHTML = "<i class='fa fa-times'></i>&nbsp;".concat(mssg);
  } else {
    controlButton(statusToSet);
    elementObject.classList.remove("is-invalid");
    elementObject.classList.add("is-valid");
    theElementObject.classList.remove("text-muted");
    theElementObject.classList.add("valid-feedback");
    theElementObject.classList.add("text-success");
    theElementObject.innerHTML = "";
    theElementObject.innerHTML = "<i class='fa fa-check-square-o'></i>&nbsp;".concat(mssg);
  }
}

function checkEmailId(emailIdentifier, formObject) {
  var emailValid = true;
  var emailObject = formObject[emailIdentifier];
  var theEmailValue = emailObject.value;
  var atRateSymPosition = theEmailValue.indexOf("@");
  var dotSymPosition = theEmailValue.lastIndexOf(".");
  var emailLength = theEmailValue.length;

  if (atRateSymPosition == 0 || atRateSymPosition == -1 || dotSymPosition == 0 || dotSymPosition == -1) {
    controlButton("i");
    setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
    emailValid = false;
  } else if (dotSymPosition - atRateSymPosition <= 2) {
    emailValid = false;
    controlButton("i");
    setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
  } else if (atRateSymPosition == emailLength - 1) {
    emailValid = false;
    controlButton("i");
    setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
  } else if (dotSymPosition == emailLength - 1) {
    emailValid = false;
    controlButton("i");
    setValidationStatus("i", emailIdentifier, emailObject, "Enter a valid email (e.g something@example.com)");
  } else {
    controlButton("v");
    setValidationStatus("v", emailIdentifier, emailObject);
    emailValid = true;
  }

  return emailValid;
}

function checkName(nameIdentifier, formObject) {
  var nameObject = formObject[nameIdentifier];
  var nameValue = nameObject.value;

  if (nameValue.length == 0) {
    controlButton("i");
    setValidationStatus("i", nameIdentifier, nameObject, "Enter valid name e.g sam stancovic");
    return false;
  } else {
    var nameCorrect = true;

    for (var index in nameValue) {
      var theAscii = nameValue.charCodeAt(index);

      if (theAscii >= 47 && theAscii <= 57) {
        nameCorrect = false;
        controlButton("i");
        setValidationStatus("i", nameIdentifier, nameObject, "Enter valid name e.g sam stancovic");
        break;
      }
    }

    if (nameCorrect == true) {
      controlButton("v");
      setValidationStatus("v", nameIdentifier, nameObject);
    }

    return nameCorrect;
  }
}

function checkPassword(passwordIdentifier, formObject) {
  var passwordObject = formObject[passwordIdentifier];

  if (passwordObject.checkValidity()) {
    controlButton("v");
    setValidationStatus("v", passwordIdentifier, passwordObject);
    unlockConfrimPassword(true);
    return true;
  } else {
    controlButton("i");
    setValidationStatus("i", passwordIdentifier, passwordObject, "Password must contains uppercase, lowercase letters with numbers\n\t\t\t\t\t\t\t\t\t\t\t\t\tand must be minimum of length 8");
    unlockConfrimPassword(false);
    return false;
  }
}

var unlockConfrimPassword = function unlockConfrimPassword(status) {
  var theConfirmPasswordObject = document.forms["RegForm"]["TheCPassword"];
  theConfirmPasswordObject.disabled = !status;
};

function confrimPassword(confirmPasswordIdentifier, passwordIdentifier, formObject) {
  var passwordObject = formObject[passwordIdentifier];
  var confirmPasswordObject = formObject[confirmPasswordIdentifier];

  if (passwordObject.value === confirmPasswordObject.value) {
    controlButton("v");
    setValidationStatus("v", confirmPasswordIdentifier, confirmPasswordObject);
  } else {
    controlButton("i");
    setValidationStatus("i", confirmPasswordIdentifier, confirmPasswordObject, "Enter the same password as above");
  }
}

function storeDataNow() {
  try {
    console.log("email status -> " + window.emailStatus);
    console.log("password status -> " + window.passwordStatus);
    console.log("name status -> " + window.nameStatus);

    if (window.emailStatus == true && window.passwordStatus == true && window.nameStatus == true) {
      var registrationFormObject = document.forms["RegForm"];
      var userEmail = registrationFormObject["TheEmail"].value;
      var userPassword = registrationFormObject["ThePassword"].value;
      var userName = registrationFormObject["TheName"].value;
      var userGender = registrationFormObject["gender"].value;
      var pushStatus = pushToDatabase([userEmail, userPassword, userName, userGender]);
    } else {
      alert("Registration Unsuccessfull");
    }
  } catch (e) {
    console.log("Exception is -> " + e.toString());
  }
}

(function () {
  window.storeDataNow = storeDataNow;
  var registrationFormObject = document.forms["RegForm"];
  var theNameObject = registrationFormObject["TheName"];
  var theEmailObject = registrationFormObject["TheEmail"];
  var thePasswordObject = registrationFormObject["ThePassword"];
  var theConfirmPasswordObject = registrationFormObject["TheCPassword"];
  theEmailObject.addEventListener("keyup", function () {
    window.emailStatus = checkEmailId("TheEmail", registrationFormObject);
    console.log(window.emailStatus);
  });
  theNameObject.addEventListener("keyup", function () {
    window.nameStatus = checkName("TheName", registrationFormObject);
    console.log(window.nameStatus);
  });
  thePasswordObject.addEventListener("keyup", function () {
    window.passwordStatus = checkPassword("ThePassword", registrationFormObject);
    console.log(window.passwordStatus);
  });
  theConfirmPasswordObject.addEventListener("keyup", function () {
    confrimPassword("TheCPassword", "ThePassword", registrationFormObject);
    console.log(window.emailStatus);
  });
  unlockConfrimPassword(false);
})();