var child_process = require("child_process");

var Player = function (command, options) {
	this.cmd = command;
	this.opts = options;
	this.child = child_process.spawn(this.cmd, this.opts);
	var pid = this.child.pid;
	console.log('player process started. pid: ' + pid);
	this.child.stdout.on('end', function() {
		console.log('player process end. pid: ' + pid);
		this.child = null;
	});

	Player.prototype.play = function (url) {
		if (url) {
			this.sendCommand('loadfile ' + url);
		} else {
			// what to do?
		}
	};

	Player.prototype.stop = function () {
		this.sendCommand('stop');
	};

	Player.prototype.pause = function () {
		this.sendCommand('pause');
	};

	Player.prototype.sendCommand = function (cmd) {
		if (this.child) {
			this.child.stdin.write(cmd + '\n');
		}
	};
};

module.exports = Player;