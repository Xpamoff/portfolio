function add_award(){
	var form = new FormData();
	form.append("img", $('#file').get(0).files[0]);
	form.append("event", $('#name_award').val());
	form.append("level", level);
	form.append("place", place);
	
	var settings = {
	  "url": "http://localhost/portfolio/api/public/api/uploadCertificate",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Authorization": "Bearer " + localStorage.getItem("token")
	  },
	  "processData": false,
	  "mimeType": "multipart/form-data",
	  "contentType": false,
	  "data": form
	};
	
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
	location.href = "http://localhost/portfolio/personal/person.html#close";
}
var level = "Школьный уровень";
var place = 1;
function award_level(arg){
	level = arg;
}
function award_place(arg){
	place = arg;
}