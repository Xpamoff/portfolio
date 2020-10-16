$(document).ready(function() {
	$('.modalDialog').on('click', function(e){
		if($(e.target).is($('.modalDialog'))){
			location.href = "index.html";
		}
	})
})