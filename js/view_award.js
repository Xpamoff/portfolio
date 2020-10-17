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
						$('.cont').append(one);
						one.append(two.append(three));
						//$('.cont').append(three);
						//$('.cont').append(four);
						one.append(five);
						five.append(six);
						five.append(seven);
						//$('.cont').append(seven);
						//$('.cont').append(eight);
						//$('.cont').append(nine);
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
		window.arr = response;
	  console.log(response);
	});
})
