import {cookieHandler} from "./cookiehandler.js";


const signOut = () =>{
	new cookieHandler().deleteCookie();
	sessionStorage.setItem("logedIn", false);
	window.open("http://localhost:8080/SocialMedia/","_self");
}
(() => {
	window.signOut = signOut;
})();