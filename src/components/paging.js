const HtmlTag = Coralian.constants.HtmlTag;
const GO_NEXT = Coralian.constants.XmlEntity.RIGHT_ANGLE + Coralian.constants.XmlEntity.RIGHT_ANGLE,
	GO_PREV = Coralian.constants.XmlEntity.LEFT_ANGLE + Coralian.constants.XmlEntity.LEFT_ANGLE,
	GO_LAST = Coralian.constants.XmlEntity.RIGHT_ANGLE + "|",
	GO_FIRST = Coralian.constants.XmlEntity.LEFT_ANGLE + "|";

function loading(name) {
	let p = dom.create(HtmlTag.P, {
		'class': 'onload'
	}, `${name} 数据载入中`);

	p.append('<img src="/res/imgs/default/loading.gif" title="loading" />');

	return p;
}

function failed(name) {
	return dom.create(HtmlTag.P, {
		'class': 'onload'
	}, `${name} 数据载入失败`);
}

function showLoop(pages, reqArg, start, now, end) {

	if (end === 0) {
		pages.append(dom.create(HtmlTag.SPAN, {
			class: 'nowpage',
			title: '当前页'
		}, 1));
	} else {
		for (; start < end; start++) {
			if (start !== now) {
				pages.append(dom.create(HtmlTag.A, {
					'class': 'showpage',
					href: toPageJs(reqArg, start),
					title: '前往第 ' + (start + 1) + ' 页'
				}, start + 1));
				// pages.append('<a class="showpage" href="javascript:front.page.show(' + changeId + ',' + start +
				// 	')" title="前往第 ' + (start + 1) + ' 页">' + (start + 1) + '</a>');
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

function toFirstJs(reqArg) {
	return `javascript: front.paging.change(${reqArg}, 0)`;
}

function toLastJs(reqArg, total) {
	return `javascript: front.paging.change(${reqArg}, ${total})`;
}

function toPageJs(reqArg, now) {
	return `javascript: front.paging.change(${reqArg}, ${now})`
}


function paging(id) {

	let pages = $(`#${id}`); // 必须是已有的节点
	let reqArg = null;

	function clear() {
		pages.empty();
	}

	return {
		init: (arg) => {
			reqArg = arg; // 外部参数
		},
		show: (now, total) => {

			clear(); // 每次都要先清空内部元素

			/*
			 * total <= 10 一口气全部显示，且没随机页面跳转
			 * 
			 * 1 2 3 4 5 6 7 8 9 10
			 */
			if (total < 10) {
				showLoop(pages, changeId, 0, now, total + 1);
			} else {
				/*
				 * total > 10 && now < 4
				 * 
				 * 1 2 3 4 5 ... >> >|
				 */
				if (now < 4) { // 写4的原因是在按到5时，已经是最后一页，所以需要进行换页操作，使用下一种表法方式来表达
					showLoop(pages, reqArg, 0, now, 5);
					pages.append(MORE_NODE);
					pages.append(dom.create(HtmlTag.A, {
						'class': "nextpage",
						'href': toPageJs(reqArg, now + 1, total),
						title: '前往下一页（' + (now + 2) + '）'
					}, GO_NEXT));
					pages.append(dom.create(HtmlTag.A, {
						'class': "toend",
						'href': toLastJs(reqArg, total),
						title: '前往最终页（' + (total + 1) + '）'
					}, GO_LAST));
				}
				/*
				 * total > 10 && now > total - 4
				 * 
				 * |< << ... 19 20 21 22 23
				 */
				else if (total - 4 < now) {
					pages.append(dom.create(HtmlTag.A, {
						'class': "tofirst",
						'href': toFirstJs(reqArg),
						title: '前往第一页'
					}, GO_LAST));
					pages.append(dom.create(HtmlTag.A, {
						'class': "prevpage",
						'href': toPageJs(reqArg, now - 1),
						title: '"前往上一页（' + now + '）'
					}, GO_PREV));
					pages.append(MORE_NODE);
					showLoop(pages, reqArg, total - 4, now, total + 1);
				}
				/*
				 * total > 10 && now < total - 4 && now > 4
				 * 
				 * |< << ... 13 14 15 16 17 ... >> >|
				 */
				else {

					pages.append(dom.create(HtmlTag.A, {
						"javascript": toFirstJs(reqArg),
						'title': "前往第一页"
					}, GO_FIRST));
					pages.append(dom.create(HtmlTag.A, {
						"javascript": toPageJs(reqArg, now - 1),
						'title': '前往上一页（' + now + '）'
					}, GO_PREV));

					pages.append(MORE_NODE);
					showLoop(pages, reqArg, now - 2, now, now + 3);
					pages.append(MORE_NODE);

					pages.append(dom.create(HtmlTag.A, {
						"javascript": toPageJs(reqArg, now + 1),
						'title': '前往下一页（' + (now + 2) + '）'
					}, GO_NEXT));
					pages.append(dom.create(HtmlTag.A, {
						'href': toLastJs(reqArg, total),
						'title': '前往最终页（' + (total + 1) + '）'
					}, GO_LAST));
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