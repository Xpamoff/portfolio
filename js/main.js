$(document).ready(function() {
	$('.modalDialog').on('click', function(e){
		if($(e.target).is($('.modalDialog'))){
			location.href = "#close";
		}
	})
})

function register_student() {
	var settings = {
	  "url": "api/public/api/register",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Content-Type": "application/json"
	  },
	  "data": JSON.stringify({"first_name": $('#firstname_stud').val(),
	  						  "last_name": $('#lastname_stud').val(),
	  						  "middle_name": $('#pastname_stud').val(),
	  						  "school_number": $('#school_stud').val(),
	  						  "email": $('#email_stud').val(),
	  						  "password": $('#password_stud').val(),
	  						  "birth_date": $('#date_stud').val(),
	  						  "class": $('#form_stud').val(),
	  						  "role":"student"}),
	
		statusCode: {
			204: function(response){
				location.href = "portfolio/";
			},
			422: function(response){
				location.href = "portfolio/error/error.html";
				$('#which_error').text() = "На данную почту уже зарегестрирован аккаунт";
			}
		}
	};
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
}