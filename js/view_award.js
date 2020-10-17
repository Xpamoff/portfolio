$(document).ready(function() {
	var settings = {
	  "url": "http://localhost/portfolio/api/public/api/getCertificates",
	  "method": "POST",
	  "timeout": 0,
	  "headers": {
	    "Authorization": "Bearer " + localStorage.getItem("token")
	  },
	  statusCode: {
			 200: function(response){
					for(var i = 0;i<response.length;i++){
						var one = $('<div class="award_cont">');
						var two = $('<div class="award_img">');
						var three = $('<img src="../api/storage/app/' + response[i].img + '">');
						var four = $('</div>');
						var five = $('<div class="rate_list">');
						if(response[i].place != 0){
							var six = $('<h4>' + response[i].place + ' место</h4>');
						}
						else{
							var six = $('<h4>Участник</h4>');
						}
						var seven = $('<p>' + response[i].event + '</p>');
						var eight = $('</div>');
						var nine = $('</div>');
						$('.cont').append(one);
						$('.cont').append(two);
						$('.cont').append(three);
						$('.cont').append(four);
						$('.cont').append(five);
						$('.cont').append(six);
						$('.cont').append(seven);
						$('.cont').append(eight);
						$('.cont').append(nine);
						// <div class="award_cont">
								// <div class="award_img">
									// <img src="../assets/news_1.jpg">
								// </div>
								// <div class="rate_list">
									// <h4>33046 место</h4>
									// <p>Олимпиада НТИ</p>
								// </div>
							// </div>
				}
			 },
			 404: function(response){
				
			}
		 }
	};
	
	$.ajax(settings).done(function (response) {
	  alert();
	});
})
