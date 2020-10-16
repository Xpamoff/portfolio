$(document).ready(function() {

	$('.modalDialog').on('click', function(e){
		if($(e.target).is($('.modalDialog'))){
			$('.response').text('');
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
	  						  "last_name": $('#surname_stud').val(),
	  						  "middle_name": $('#pastname_stud').val(),
	  						  "school_number": $('#school_stud').val(),
	  						  "email": $('#email_stud').val(),
	  						  "password": $('#password_stud').val(),
	  						  "birth_date": $('#date_stud').val(),
	  						  "class": $('#form_stud').val(),
	  						  "role":"student"}),
	
		statusCode: {
			204: function(response){
				$('.response').text('Вы зарегистрировались');
				$('.response').css('display', 'flex');
				$('.response').css('color', 'green');
			},
			422: function(response){
				$('.response').text('Неверный Email');
				$('.response').css('display', 'flex');
				$('.response').css('color', 'red');
			}
		}
	};
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
}

function register_teacher() {
	var settings = {
	  "url": "api/public/api/register",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Content-Type": "application/json"
	  },
	  "data": JSON.stringify({"first_name": $('#firstname_t').val(),
	  						  "last_name": $('#surname_t').val(),
	  						  "middle_name": $('#pastname_t').val(),
	  						  "school_number": $('#school_t').val(),
	  						  "email": $('#email_t').val(),
	  						  "password": $('#password_t').val(),
	  						  "position": $('#job_t').val(),
	  						  "role":"teacher"}),
	
		statusCode: {
			204: function(response){
				$('.response').text('Вы зарегистрировались');
				$('.response').css('display', 'flex');
				$('.response').css('color', 'green');
			},
			422: function(response){
				$('.response').text('Неверный Email');
				$('.response').css('display', 'flex');
				$('.response').css('color', 'red');
			}
		}
	};
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
}

function login_teacher(){
	var settings = {
	  "url": "api/public/api/auth",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Content-Type": "application/json"
	  },
	  "data": JSON.stringify({"role":"teacher",
	  						  "email": $('#email_t_log').val(),
	  						  "password": $('#password_t_log').val()}),
	  statusCode: {
			200: function(response){
				location.href = "../"
				localStorage.setItem("token", response.data.token);
				location.href = "http://localhost/portfolio/personal/person.html";
				$('.response').text('Вы зашли');
				$('.response').css('display', 'flex');
				$('.response').css('color', 'green');
			},
			401: function(response){
				$('.response').text('Неверный Email или пароль');
				$('.response').css('display', 'flex');
				$('.response').css('color', 'red');
			}
		}
	};
	
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
}
function login_student(){
	var settings = {
	  "url": "api/public/api/auth",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Content-Type": "application/json"
	  },
	  "data": JSON.stringify({"role":"student",
	  						  "email": $('#email_stud_log').val(),
	  						  "password": $('#password_stud_log').val()}),
	  statusCode: {
			200: function(response){
				console.log("1");
				localStorage.setItem("token", response.data.token);
				location.href = "http://localhost/portfolio/personal/person.html";
				$('.response').text('Вы зашли');
				$('.response').css('display', 'flex');
				$('.response').css('color', 'green');
			},
			401: function(response){
				$('.response').text('Неверный Email или пароль');
				$('.response').css('display', 'flex');
				$('.response').css('color', 'red');
			}
		}
	};
	
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
}

function exit(){
	localStorage.removeItem('token');
	location.href = "localhost/";
}