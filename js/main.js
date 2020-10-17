$(document).ready(function() {

	$('.modalDialog').on('click', function(e){
		if($(e.target).is($('.modalDialog'))){
			$('.response').text('');
			location.href = "#close";
		}
	})

	var settings = {
		  "url": "http://localhost/portfolio/api/public/api/getTeachers",
		  "method": "POST",
		  "timeout": 0,
		  "headers": {
		    "Authorization": "Bearer " + localStorage.getItem("token")
		  },
		  statusCode: {
			 200: function(response){
				 console.log(response);
				 for(var i = 0;i < response.data.length;i++){
					 var first = $('<input type="radio" name="list" value="' + response.data[i].id + '_value" id="list[' + i + ']">');
					 var second = $('<label for="list[' + i + ']" name="' + response.data[i].id + '">' + response.data[i].first_name + ' ' + response.data[i].last_name + '</label>');
					 $('.items').prepend(second);
					 $('.items').prepend(first);
				 }
			 },
			 404: function(response){
				
			}
		 }
		};
		
		$.ajax(settings).done(function (response) {
		  console.log(response);
		});
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
	var form = new FormData();
	var settings = {
	  "url": "api/public/api/exit",
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

	localStorage.removeItem('token');
	location.href = "http://localhost/";
}

function settings(){
	location.href = "http://localhost/portfolio/personal/person.html#settings";
}
function change_teacher(){

	console.log($('.items').children());
	var a = $('.items').children();
	var t_id;
	for(var i = 0;i<a.length;i++){
		if($(a[i]).css('display')=='block'){
			t_id = $(a[i]).attr('name');
		}
	}
		var settings = {
	  "url": "http://localhost/portfolio/api/public/api/sendRequest",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Authorization": "Bearer " + localStorage.getItem("token"),
	    "Content-Type": "application/json"
	  },
	  "data": JSON.stringify({"teacher_id":t_id}),
	};
	
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
	location.href = "http://localhost/portfolio/personal/person.html";
}
function add_award(){
	location.href = "http://localhost/portfolio/personal/person.html";
}
function profile(){
	location.href = "http://localhost/portfolio/personal/person.html";
}
