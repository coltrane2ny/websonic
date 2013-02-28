$(function(){
	var streamBaseUrl;
	var player;
	$.getJSON(
		"config.json",
		function(json, status){
			streamBaseUrl = 'http://' + json.subsonic.host + ':' + json.subsonic.port + 
				json.subsonic.rest.base + 'stream.view' + 
				'?u=' + json.subsonic.rest.user +
				'&p=' + json.subsonic.rest.pass + 
				'&v=' + json.subsonic.rest.version + 
				'&c=' + json.subsonic.rest.clientName;
			player = json.player;
		}
	);

	$("button.play").click(function(){
		var songId = $(this).attr("id");
		var streamUrl = streamBaseUrl + '&id=' + songId;
		request(player, 'play', {
			stream: streamUrl,
			command: player.command,
			options: player.options
		});
	});

	$("button.stop").click(function(){
		request(player, 'stop', {});
	});

	function request(player, method, json){
		var url = 'http://' + player.host + ':' + player.port + '/' + method;
		$.ajax(url, {
			cache: false,
			data: json
		});
	}
});
