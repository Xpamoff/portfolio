$(document).ready(function() {
	var first;
	var settings = {
		  "url": "http://localhost/portfolio/api/public/api/getStudents",
		  "method": "POST",
		  "timeout": 0,
		  "headers": {
		    "Authorization": "Bearer " + localStorage.getItem("token")
		  },
		  statusCode: {
			 200: function(response){
				 console.log(response);
				 for(var i = 0;i < response.data.length;i++){
				 	console.log(first);
					 var d = $('<option value="' + response.data[i].id + '">' + response.data[i].first_name + ' ' + response.data[i].last_name + '</option>');
					 $('#selector_students').append(d);
				 }


			 },
			 404: function(response){
				
			}
		 }
		};
		
		$.ajax(settings).done(function (response) {
			console.log(first);
		  console.log(response);
		});

		var settings = {
		"url": "http://localhost/portfolio/api/public/api/getTeacherCertificates",
		"method": "POST",
		"timeout": 0,
		"headers": {
		"Content-Type": "application/json",
		"Authorization": "Bearer " + localStorage.getItem("token")
		},
		"data": JSON.stringify({"id": 0}),
		 statusCode: {
			 200: function(response){
			 		$('.conta').empty();
					for(var i = 0;i<response.data.length;i++){
						var one = $('<div class="award_cont"></div>');
						var two = $('<div class="award_img"></div>');
						var three = $('<img src="../api/storage/app/' + response.data[i].img + '">');
						var four = $('</div>');
						var five = $('<div class="rate_list"></div>');
						if(response.data[i].place != 0){
							var six = $('<h4>' + response.data[i].place + ' место</h4>');
						}
						else{
							var six = $('<h4>Участник</h4>');
						}
						var seven = $('<p>' + response.data[i].event + '</p>');
						var eight = $('</div>');
						var nine = $('</div>');
						$('.conta').append(one);
						one.append(two.append(three));
						one.append(five);
						five.append(six);
						five.append(seven);
				}
			 },
			 404: function(response){
				$('.conta').empty();
				$('.conta').append('<h4>Грамот нет</h4>');
			}
		 }
		};
		
		$.ajax(settings).done(function (response) {
		console.log(response);
		});
})

function change_page(arg){
	first = arg;
	var settings = {
		"url": "http://localhost/portfolio/api/public/api/getTeacherCertificates",
		"method": "POST",
		"timeout": 0,
		"headers": {
		"Content-Type": "application/json",
		"Authorization": "Bearer " + localStorage.getItem("token")
		},
		"data": JSON.stringify({"id": first}),
		 statusCode: {
			 200: function(response){
			 	$('.conta').empty();
					for(var i = 0;i<response.data.length;i++){
						var one = $('<div class="award_cont"></div>');
						var two = $('<div class="award_img"></div>');
						var three = $('<img src="../api/storage/app/' + response.data[i].img + '">');
						var four = $('</div>');
						var five = $('<div class="rate_list"></div>');
						if(response.data[i].place != 0){
							var six = $('<h4>' + response.data[i].place + ' место</h4>');
						}
						else{
							var six = $('<h4>Участник</h4>');
						}
						var seven = $('<p>' + response.data[i].event + '</p>');
						var eight = $('</div>');
						var nine = $('</div>');
						$('.conta').append(one);
						one.append(two.append(three));
						one.append(five);
						five.append(six);
						five.append(seven);
				}
			 },
			 404: function(response){
				 $('.conta').empty();
				$('.conta').append('<h4>Грамот нет</h4>');
			}
		 }
		};
		
		$.ajax(settings).done(function (response) {
		console.log(response);
		});
}