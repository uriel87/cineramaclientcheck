




$( document ).ready(function() {

	setInterval(function() {
		$( "#gbox" ).fadeOut('slow', function() {
			}).fadeIn('slow', function() {
		});
	}, 10);


	setInterval(function() {
		$( "#pbox" ).fadeOut('slow', function() {
			}).fadeIn('2500', function() {
		});

	}, 20);

	setInterval(function() {
		$( "#bbox" ).fadeOut('400', function() {
			}).fadeIn('2000', function() {
		});
	}, 30);


	setInterval(function() {
		$( "#rbox" ).fadeOut('400', function() {
			}).fadeIn('100', function() {
		});
	}, 40);

});










