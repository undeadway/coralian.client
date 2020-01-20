
const TO_DOWN = 0,
	TO_RIGHT = 1,
	TO_TOP = 2,
	TO_LEFT = 3;

function funcInterval(speed, target, inner, direction, callback) {

	return setInterval(function () {
		switch (direction) {
			case 0:
				if (target.scrollTop <= 0)
					target.scrollTop = inner[1].offsetHeight;
				else {
					target.scrollTop--;
				}
				break;
			case 1:
				if (target.scrollLeft === 0)
					target.scrollLeft = inner[1].offsetWidth;
				else {
					target.scrollLeft--;
				}
				break;
			case 2:
				if (inner[1].offsetHeight - target.scrollTop <= 0)
					target.scrollTop -= inner[0].offsetHeight;
				else {
					target.scrollTop++;
				}
				break;
			case 3:
				if (inner[1].offsetWidth - target.scrollLeft <= 0)
					target.scrollLeft -= inner[0].offsetWidth;
				else {
					target.scrollLeft++;
				}
				break;
			default:
				throw new Error("错误的方向");
		}

		if (callback) callback();

	}, speed);
}

function setting(node, width, height, callback) {

	node.style.width = width + "px";
	node.style.height = height + "px";
	node.style.overflow = node.style.overflowX = node.style.overflowY = "hidden";

	let target = node.getElementsByTagName("div")[0];
	if (!target) return;

	callback(target);
}

/*
 * marquee 模块
 * JS Marquee Version 1.2(Javascript实现Marquee的效果,实现无缝/有间隙的二维滚动效果)
 * Author : ChenReal Email : chenreal@21cn.com Date : 2007-10-22 
 * 有修改
 * 
 * id : 滚动目标的 ID
 * tag : 滚动目标的标签
 * width : 滚动范围的宽度
 * height : 滚动范围的高度
 * direction : 滚动方向：0:下->上，1:左->右，2:上->下，3:右->左
 * speed : 滚动速度，0最快，无最慢
 * space : 滚动时是否有间隙：true - 有间隙；false - 无间隙
 * stop : 鼠标覆盖时是否停止：true - 停止；false - 不停止
 */
function marquee({ id, tag, width, height, direction, speed, space, stop }) {

	var intervalID;
	var target = document.getElementById(id);

	setting(target, width, height, function (innerDiv) {

		innerDiv.innerHTML += innerDiv.innerHTML;
		let innerTag = innerDiv.getElementsByTagName(tag);

		switch (direction) {
			case 0:
				innerDiv.style.width = width + "px";
				innerTag[0].style.width = width + "px";
				innerTag[1].style.width = width + "px";
				if (height >= innerTag[1].offsetHeight || space) {
					innerTag[0].style.paddingBottom = height + "px";
				}
				break;
			case 1:
				innerDiv.noWrap = true;
				if (width >= innerTag[1].offsetWidth || space) {
					innerTag[0].style.paddingLeft = width + "px";
					innerTag[1].style.paddingLeft = width + "px";
				}
				break;
			case 2:
				innerDiv.style.width = width + "px";
				innerTag[0].style.width = width + "px";
				innerTag[1].style.width = width + "px";
				if (height >= innerTag[1].offsetHeight || space) {
					innerTag[0].style.paddingTop = height + "px";
					innerTag[1].style.paddingTop = height + "px";
				}
				break;
			case 3:
				innerDiv.noWrap = true;
				if (width >= innerTag[1].offsetWidth || space) {
					innerTag[0].style.paddingLeft = width + "px";
					innerTag[1].style.paddingLeft = width + "px";
				}
				break;
			default:
				var e = new Error("错误的方向");
				alert(direction);
				alert(e.stack);
				throw e;
		}

		if (stop) {
			target.onmouseover = function () {
				clearInterval(intervalID);
			};
			target.onmouseout = function () {
				intervalID = funcInterval(speed, target, innerTag, direction);
			};
		}
		intervalID = funcInterval(speed, target, innerTag, direction);
	});
}

exports = module.exports = {
	Direction: {
		TOP: TO_TOP,
		LEFT: TO_LEFT,
		RIGHT: TO_RIGHT,
		DOWN: TO_DOWN,
	},
	marquee: marquee,
};