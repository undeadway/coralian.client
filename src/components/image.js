const { getScrollTop, doc } = require("./parts");

let album = doc.createElement('div');
album.zIndex = "2";
album.style.position = "absolute";
let img = doc.createElement('img');
album.onclick = Function.EMPTY_BODY;
let background = doc.createElement('div');
background.onclick = close;
let body = null;

function close() {
	album.removeChild(img);
	body.remove(album);
	body.remove(background);
}

exports = module.exports = {
	resize: function (obj) {
		obj.proto = {
			width: obj.width,
			height: obj.height
		};
		if (obj.width > 800) {
			obj.width = 800;
		}
	},
	protoSize: function (obj) {

		let scrollHeight = doc.documentElement.scrollHeight; // 滚动条高度，也就是整个页面的高度

		if (body === null) {
			body = $("body");
			background.zIndex = "1";
			background.style.width = "100%";
			background.style.height = scrollHeight + "px";
			background.style.background = "#000000";
			background.style.opacity = "0.85";
			background.style.position = "absolute";
			background.style.left = "0px";
			background.style.top = "0px";
		}
		let innerHeight = window.innerHeight; // 页面可视高度
		let innerWidth = window.innerWidth; // 页面可视宽度
		let protoHeight = obj.proto.height; // 图像原始高度
		let protoWidth = obj.proto.width; // 图像原始宽度
		let top, left;
		if (protoHeight < innerHeight) { // 图像高度 < 页面可视高度
			// 页面正中显示
			top = (innerHeight - protoHeight) / 2;
		} else { // 图像高度>页面可视
			// 页面上下 padding 40px 显示
			top = 40;
			if (protoHeight > scrollHeight - 80) { // 图像高度 > 滚动条高度-80
				//  页面上下 padding 40px 显示，且页面高度加到适合图像高度
				background.style.height = (protoHeight + 80) + "px";
			}
			// 图像高度 < 滚动条高度-80不做任何处理
		}

		if (protoWidth < innerWidth) { // 图像宽度 < 页面可视宽度
			// 页面正中显示
			left = (innerWidth - protoWidth) / 2;
		} else {
			// 调节滚动条宽度
			background.style.width = protoWidth + "80px";
			left = 40;
		}

		album.style.top = Math.ceil(getScrollTop() + top) + "px";
		album.style.left = Math.ceil(left) + "px";

		img.src = obj.src;
		img.height = protoHeight;
		img.width = protoWidth;
		img.title = obj.title;

		body.append(background);
		album.appendChild(img);
		body.append(album);
	},
	closeAlbum: close
};