function create(tag, attr, html) {
	var element = $(`<${tag}></${tag}>`);
	if (typeIs(attr, String.TYPE_NAME)) {
		html = attr;
		attr = null;
	}
	if (!Object.isEmpty(attr)) {
		element.attr(attr);
	}
	if (html) {
		element.html(html);
	}
	return element;
}

function createByJsObject(root, objs) {

	Array.forEach(objs, (i, obj) => {
		var node = create(obj.tag, obj.attr, obj.text);
		if (obj.child) {
			createByJsObject(node, obj.child);
		}
		root.append(node);
	});
}

module.exports = exports = {
	create: create,
	createByJsObject: function (root, objs) {

		if (typeIs(objs, String.TYPE_NAME)) {
			objs = JSON.parse(objs);
		}
		createByJsObject(root, objs);
	}
}