$(document).ready(function() {
	var tkn = localStorage.getItem("token");
	if(tkn){
		if(localStorage.getItem("role")=='student'){
			location.href = "http://localhost/portfolio/personal/person.html";
		}
		else{
			location.href = "http://localhost/portfolio/personal/teacher.html";
		}
	}
	else{
		location.href = "http://localhost/portfolio/index.html";
	}
})