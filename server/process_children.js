var children = [];

function push(child) {
	children.push(child);
}

function pop() {
	if (children.length == 0) {
		return null;
	}
	child = children[0];
	children.splice(0, 1);
	return child;
}

exports.push = push;
exports.pop = pop;