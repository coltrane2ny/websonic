$(document).ready(function() {
	$('.album').each(function() {
		var div = $(this);
		var albumId = $(div).attr('id');
		$.getJSON('/json/album/' + albumId, function(json) {
			var table = $("<table/>").appendTo(div);
			for (var i = 0; i < json.length; i++) {
				$(table).append('<tr><td>'
					+ json[i].title + '</td><td>'
					+ '<div class="play" id="' + json[i].id + '">play</div>' + '</td></tr>');
			};
		});
	});

	$('.album').on('mouseenter', '.play', function() {
		$(this).addClass('highlight');
	});
	$('.album').on('mouseleave', '.play', function() {
		$(this).removeClass('highlight');
	});
	$('.album').on('click', '.play', function() {
		var songId = $(this).attr('id');
		$.getJSON('/player/play/' + songId, function(json) {});
	});

	$('#pauseButton').on('click', function() {
		$.getJSON('/player/pause/', function(json) {});
	});
	$('#stopButton').on('click', function() {
		$.getJSON('/player/stop/', function(json) {});
	});
});
