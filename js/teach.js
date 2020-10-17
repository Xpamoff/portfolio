$(document).ready(function() {

	var settings = {
		  "url": "http://localhost/portfolio/api/public/api/getRequests",
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
					 var second = $('<label for="list[' + i + ']" name="' + response.data[i].id + '">' + response.data[i].student_first_name + ' ' + response.data[i].student_last_name + '</label>');
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

function add_student(){
	console.log($('.items').children());
	var a = $('.items').children();
	var s_id;
	for(var i = 0;i<a.length;i++){
		if($(a[i]).css('display')=='block'){
			s_id = $(a[i]).attr('name');
			break;
		}
	}
	console.log(s_id);
		var settings = {
	  "url": "http://localhost/portfolio/api/public/api/acceptRequest",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Authorization": "Bearer " + localStorage.getItem("token"),
	    "Content-Type": "application/json"
	  },
	  "data": JSON.stringify({"id": s_id}),
	};
	
	$.ajax(settings).done(function (response) {
	  console.log(response);
	});
	location.href = "http://localhost/portfolio/personal/teacher.html";
}

