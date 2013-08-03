$(document).ready(function() {
	$('.album').each(function() {
		var div = $(this);
		var albumId = $(div).attr('id');
		$.getJSON('/api/subsonic/album/' + albumId, function(json) {
			var table = $("<table/>").appendTo(div);
			for (var i = 0; i < json.length; i++) {
				$(table).append("<tr><td>"
					+ json[i].id + "</td><td>"
					+ json[i].title + "</td><td>"
					+ json[i].album + "</td></tr>");
			};
		});
	});
});