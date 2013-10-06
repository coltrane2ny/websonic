$(document).ready(function() {
	$('.album').each(function() {
		var div = $(this);
		var albumId = $(div).attr('id');
		$.getJSON('/api/subsonic/album/' + albumId, function(json) {
			var table = $("<table/>").appendTo(div);
			for (var i = 0; i < json.length; i++) {
				$(table).append('<tr><td>'
					+ json[i].title + '</td><td>'
					+ json[i].album + '</td><td>'
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
		console.log(songId);
		$.getJSON('/api/subsonic/play/' + songId, function(json) {

		});
	});
});
