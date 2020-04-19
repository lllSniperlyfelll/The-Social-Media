


export class cookieHandler{
	
	/*This function handles thecreation of a cookie
	this creates cookie with username and the expiery date
	, cookies are valid for 1 week*/

	getCookieDate(incFactor){
		let date = new Date();
		date.setDate(date.getDate() + incFactor);
		return date.toUTCString();
	}

	extractUsername(theCookie){
		let rawCookie = decodeURIComponent(theCookie).split(";");
		const rawUsername = rawCookie[0];
		const userName = rawUsername.substring(rawUsername.indexOf("=")+1, rawUsername.length);
		return userName;
	}

	createCookie(emailId){
		try{
			const cookieEmail = emailId;
			const cookieExpiery = this.getCookieDate(7);
			console.log("Date for cookie -> "+cookieExpiery);
			const cookieData = encodeURIComponent(`username=${cookieEmail};expires=${cookieExpiery}`);
			document.cookie = cookieData; 
			console.log("The cookie -> "+document.cookie);
		}
		catch(e){
			console.log("Error in creating cookie -> "+e.toString());
		}
	}

	/*This function deletes the cookie i.e delays the expiery
	of the cookie to back by one year*/
	deleteCookie(emailId){
		const delayedDate = this.getCookieDate(-365);
		const cookieData = encodeURIComponent(`username=;expires=${delayedDate}`);
	}

	getCookie(){

		const theCookie = document.cookie;
		if(theCookie == null || theCookie == "" || theCookie == undefined){
			return "na";
		}
		else{
			return(this.extractUsername(theCookie));
		}

	}
}