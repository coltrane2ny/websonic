$(function(){
	var streamBaseUrl;
	var playerUrl;
	var playerBin;
	$.getJSON(
		"config.json",
		function(json, status){
			streamBaseUrl = 'http://' + json.subsonic.host + ':' + json.subsonic.port + 
				json.subsonic.rest.base + 'stream.view' + 
				'?u=' + json.subsonic.rest.user +
				'&p=' + json.subsonic.rest.pass + 
				'&v=' + json.subsonic.rest.version + 
				'&c=' + json.subsonic.rest.clientName;
			playerUrl = 'http://' + json.player.host + ':' + json.player.port + '/play';
			playerBin = json.player.player;
		}
	);

	$("button.play").click(function(){
		var songId = $(this).attr("id");
		var streamUrl = streamBaseUrl + '&id=' + songId;
		$.get(playerUrl, {
			stream: streamUrl,
			player: playerBin,
		});
	});
});
