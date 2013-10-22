var child_process = require("child_process");

var Player = function (command, options) {
	this.cmd = command;
	this.opts = options;
	this.child = null;

	Player.prototype.play = function (url) {
		if (url) {
			this.opts.push(url);
			this.child = child_process.spawn(this.cmd, this.opts);
			var pid = this.child.pid;
			console.log('player process started. pid: ' + pid);
			this.child.stdout.on('end', function() {
				console.log('player process end. pid: ' + pid);
				this.child = null;
			});
		} else {
			if (this.child) {
				this.child.stdin.write('play\n');
			}			
		}
	};

	Player.prototype.stop = function () {
		if (this.child) {
			this.child.stdin.write('stop\n');			
		}
	};

	Player.prototype.pause = function () {
		if (this.child) {
			this.child.stdin.write('pause\n');
		}
	};
};

module.exports = Player;