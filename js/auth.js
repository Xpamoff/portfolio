$(document).ready(function() {
	var tkn = localStorage.getItem("token");
	if(tkn){
		location.href = "http://localhost/portfolio/personal/person.html";
	}
	else{
		location.href = "http://localhost/portfolio/index.html";
	}
})