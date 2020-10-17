$(document).ready(function() {
		var settings = {
	  "url": "http://localhost/portfolio/api/public/api/getUserData",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Authorization": "Bearer " + localStorage.getItem("token")
	  },
	  statusCode: {
			 200: function(response){
				 console.log(response);
				 $('#name').text('Имя: ' + response.data[0].first_name)
				 $('#surname').text('Фамилия: ' + response.data[0].last_name)
				 $('#school').text('Школа: ' + response.data[0].school_number)
				 $('#email').text('Почта: ' + response.data[0].email)
				 if(response.data[0].teacher_id != null){
				 	var teacher_id = response.data[0].teacher_id;
				 	var settings = {
					  "url": "http://localhost/portfolio/api/public/api/getTeachers",
					  "method": "POST",
					  "timeout": 0,
					  "headers": {
					    "Authorization": "Bearer " + localStorage.getItem("token")
					  },
						statusCode: {
							 200: function(response1){
								 console.log(response1);
								 response1.data.forEach(function(arg){
								 	if(arg.id == teacher_id){
								 		$('#teacher').text('Учитель: ' + arg.first_name + ' ' + arg.last_name);
								 	}
								 })
							 },
							 404: function(response1){
								
							}
		 				}
					};
					
					$.ajax(settings).done(function (response1) {
					  console.log(response);
					});

				 }
				 else{
				 	$('#teacher').text('Учитель не указан')
				 }
				 $('#form').text('Класс: ' + response.data[0].class)
				 }
		 },
	};
	
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
})

