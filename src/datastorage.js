
export const setInfo = (name = "na", email = "na", gender = "na", status = "na", blog = "na") => {
	
	sessionStorage.setItem("name", name);
	
	sessionStorage.setItem("email", email);
	
	sessionStorage.setItem("gender", gender);
	
	sessionStorage.setItem("status", status);
	
	sessionStorage.setItem("blog",blog);
	

	console.log([
	sessionStorage.getItem("name"),
	sessionStorage.getItem("email"),
	sessionStorage.getItem("gender"),
	sessionStorage.getItem("status"),
	sessionStorage.getItem("blog")
	]);
	}

export const getInfo = () => {
	const userDataPack = [
	sessionStorage.getItem("name"),
	sessionStorage.getItem("email"),
	sessionStorage.getItem("gender"),
	sessionStorage.getItem("status"),
	sessionStorage.getItem("blog")
	];
	console.log("User data from getInfo -> "+userDataPack);
	return  userDataPack;
}