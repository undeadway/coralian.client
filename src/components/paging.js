const HtmlTag = Coralian.constants.HtmlTag;
const GO_NEXT = Coralian.constants.XmlEntity.RIGHT_ANGLE + Coralian.constants.XmlEntity.RIGHT_ANGLE,
	GO_PREV = Coralian.constants.XmlEntity.LEFT_ANGLE + Coralian.constants.XmlEntity.LEFT_ANGLE,
	GO_LAST = Coralian.constants.XmlEntity.RIGHT_ANGLE + "|",
	GO_FIRST = "|" + Coralian.constants.XmlEntity.LEFT_ANGLE;

const dom = require("./dom");

function loading(name) {
	let p = dom.create(HtmlTag.P, {
		'class': 'onload'
	});

	p.append(`<img src="/res/imgs/default/loading.gif" title="loading" /> ${name} 数据载入中`);

	return p;
}

function failed(name) {
	return dom.create(HtmlTag.P, {
		'class': 'onload'
	}, `${name} 数据载入失败`);
}

function showLoop(pages, reqArg, start, now, end, callback) {

	if (end === 0) {
		pages.append(dom.create(HtmlTag.SPAN, {
			class: 'nowpage',
			title: '当前页'
		}, 1));
	} else {
		for (; start < end; start++) {
			if (start !== now) {
				pages.append(createGoPage(reqArg, start, callback));
			} else {
				pages.append(dom.create(HtmlTag.SPAN, {
					class: 'nowpage',
					title: '当前页 (' + now + 1 + '）'
				}, now + 1));
			}
		}
	}
}

const MORE_NODE = "...";

function createGoPage(reqArg, pageNo, callback) {

	let goPage = dom.create(HtmlTag.A, {
		'class': 'showpage',
		title: '前往第 ' + (pageNo + 1) + ' 页'
	}, pageNo + 1);

	goPage.on('click', function () {
		callback(reqArg, pageNo)
	});

	return goPage;
}

function createGoFirst(reqArg, callback) {

	let goFirst = dom.create(HtmlTag.A, {
		'class': "tofirst",
		title: '前往第一页'
	}, GO_FIRST);

	goFirst.on('click', function () {
		callback(reqArg);
	});

	return goFirst;
}

function createGoPrev(reqArg, now, callback) {

	let goPrev = dom.create(HtmlTag.A, {
		'title': '前往上一页（' + now + '）'
	}, GO_PREV);
	goPrev.on('click', function () {
		callback(reqArg, now - 1);
	});

	return goPrev;
}

function createGoNext(reqArg, now, total, callback) {

	let goNext = dom.create(HtmlTag.A, {
		'class': "nextpage",
		title: '前往下一页（' + (now + 2) + '）'
	}, GO_NEXT);

	goNext.on('click', function () {
		callback(reqArg, now + 1, total);
	});

	return goNext;
}

function createGoLast(reqArg, total, callback) {

	let goLast = dom.create(HtmlTag.A, {
		'class': "toend",
		title: '前往最终页（' + (total + 1) + '）'
	}, GO_LAST);

	goLast.on('click', function () {
		callback(reqArg, total);
	});

	return goLast;
}

function paging(id) {

	let pages = $(id); // 必须是已有的节点

	function clear() {
		pages.empty();
	}

	return {
		show: (now, reqArg, total, callback) => {

			clear(); // 每次都要先清空内部元素

			/*
			 * total <= 10 一口气全部显示，且没随机页面跳转
			 * 
			 * 1 2 3 4 5 6 7 8 9 10
			 */
			if (total < 10) {
				showLoop(pages, reqArg, 0, now, total + 1, callback);
			} else {
				/*
				 * total > 10 && now < 4
				 * 
				 * 1 2 3 4 5 ... >> >|
				 */
				if (now < 4) { // 写4的原因是在按到5时，已经是最后一页，所以需要进行换页操作，使用下一种表法方式来表达
					showLoop(pages, reqArg, 0, now, 5, callback);
					pages.append(MORE_NODE);
					pages.append(createGoNext(reqArg, now, total, callback));
					pages.append(createGoLast(reqArg, total, callback));
				}
				/*
				 * total > 10 && now > total - 4
				 * 
				 * |< << ... 19 20 21 22 23
				 */
				else if (total - 4 < now) {
					pages.append(createGoFirst(reqArg, callback));
					pages.append(createGoPrev(reqArg, now, callback));
					pages.append(MORE_NODE);
					showLoop(pages, reqArg, total - 4, now, total + 1, callback);
				}
				/*
				 * total > 10 && now < total - 4 && now > 4
				 * 
				 * |< << ... 13 14 15 16 17 ... >> >|
				 */
				else {
					pages.append(createGoFirst(reqArg, callback));
					pages.append(createGoPrev(reqArg, now, callback));
					pages.append(MORE_NODE);
					showLoop(pages, reqArg, now - 2, now, now + 3, callback);
					pages.append(MORE_NODE);
					pages.append(createGoNext(reqArg, now, total, callback));
					pages.append(createGoLast(reqArg, total, callback));
				}
			}
		},
		loading: function (name) {
			clear();
			pages.append(loading(name));
		},
		failed: function (name) {
			clear();
			pages.append(failed(name));
		}
	};
}

paging.getLoading = function (name) {
	return loading(name);
};
paging.getFailed = function (name) {
	return failed(name);
};

exports = module.exports = paging;