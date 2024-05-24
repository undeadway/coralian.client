/**
 * 1. 每一层即都可以是叶节点，也可以是父节点
 * 2. 数据只确定结构
 * 3. 动作由外部数据构成

 数据结构如下：
[
	{
		name: 'img',
		title: '图片'
	},
	{
		name: 'align',
		title: '对齐方式',
		list: [
			{
				name: "alignleft",
				title: '左对齐'
			},
			{
				name: "aligncenter",
				title: '居中对齐'
			},
			{
				name: "alignright",
				title: '右对齐'
			}
		]
	}
]

动作结构如下：
{
	alignleft: function() {

	}
}
 */
// 因为考虑到一个也米嗯中可能有多个menu，所以这里不设置单例
module.exports = exports = function () {

	let nodeList = []; // 所有子节点

	function override(layer, list, subList) {

		// 隐藏的时候，需要隐藏所有子节点
		Coralian.util.ObjectUtil.override(list, 'hide', (callback) => function () {

			isOpen = false; // 隐藏的时候，关闭显示开关

			Array.forEach(subList, (i, item) => { // 递归隐藏子节点
				item.hide();
			});

			callback();
		});

		// 显示的时候，只要显示当前层和当前层的下一层就可以了
		Coralian.util.ObjectUtil.override(list, 'show', (callback) => function (index) {

			// 因为子节点也同样实现了当前这个被覆盖过的 show 方法
			// 所以这里会产生递归调用，需要通过输入的层号和当前所在层号一致来判断是否是目标层
			// 如果不是当前层，则什么都不做，来中止递归调用
			if (index !== layer) return;

			callback();// 显示当前层

			// 显示当前层的下一层
			Array.forEach(subList, (i, item) => {
				item.show(index); // 将需要显示的目标层号向下传递
			});
		});
	}

	function createTag(tag, val, attr) {
		if (typeIs(val, 'undefined')) {
			val = String.BLANK;
		}
		if (typeIs(val, Object.TYPE_NAME)) {
			attr = val;
			val = String.BLANK;
		}
		let element = $(`<${tag}>${val}</${tag}>`);
		if (attr) {
			element.attr(attr);
		}

		return element;
	}

	function createChild(layer, data, events) { // 所有目录和下级目录

		let listItems = [];

		let list = createTag(Coralian.constants.HtmlTag.UL, {
			'class': `menu_list ${data.name}`,
			id: `menu_list_${data.name}`,
			style: "margin-left:" + (!!layer ? 106 : -3) + "px; margin-top:" + (!!layer ? -2 : 1.6) + "rem"
		});

		let isOpen = false; // 每个下拉菜单都有一个 isOpen 属性
		list.hide(); // 初始状态隐藏自己
		list.isOpen = () => isOpen;

		override(layer, list, listItems);

		Array.forEach(data.list, (i, subData) => {

			let listItem = createTag(Coralian.constants.HtmlTag.LI, {
				'class': `list_menu`,
				id: `list_menu_${data.name}`,
			});
			let button = createTag(Coralian.constants.HtmlTag.DIV, subData.title);
			listItem.append(button);
			let subLists = [];

			override(layer, listItem, subLists);

			if (subData.list) {
				let subList = createChild(layer + 1, subData, events);
				listItem.append(subList); // 循环递归创建子目录
				subLists.push(subList);

				button.attr({
					'style': 'background-position:right center;background-repeat:no-repeat;'
				});

				button.on('click', (event) => {

					event.stopPropagation();

					if (subList.isOpen()) { // 子列表未开放
						subList.hide(); // 隐藏列表
					} else {
						Array.forEach(listItems, (i, tmpItem) => {
							if (listItem !== tmpItem) {
								tmpItem.hide(); // 隐藏其他所有同级列表
								tmpItem.show(layer); // 重新显示列表
							}
						})
						subList.show(layer + 1); // 显示子列表
					}
				});
			} else {
				listItem.on('click', (event) => {
					hideAll(event);
					events[subData.name](event);
				});
			}
			list.append(listItem);
			listItems.push(listItem);
		});

		return list;
	}

	function hideAll(event) {
		if (event) {
			event.stopPropagation();
		}
		// 隐藏所有列表
		Array.forEach(nodeList, (i, node) => {
			node.hide();
		});
	}

	return {
		create: (data, events) => {
			let menuBar = createTag(Coralian.constants.HtmlTag.DIV, {
				id: 'menubar_box',
				class: 'menubar_box'
			}); // 创建 root 节点

			Array.forEach(data, (i, itemData) => {

				let barItem = createTag(Coralian.constants.HtmlTag.DIV, {
					'class': 'menubar_item'
				}); // 节点
				let button = createTag(Coralian.constants.HtmlTag.DIV, itemData.title); // 按钮

				if (itemData.list) {
					let child = createChild(0, itemData, events); // 创建子节点
					barItem.append(child);
					nodeList.push(child);

					button.on('click', (event) => {
						hideAll(event);
						child.show(0); // 仅显示当前列表
					});
				} else {
					button.on('click', (event) => {
						hideAll(event);
						events[itemData.name](event); // 执行事件
					});
				}

				barItem.append(button);
				menuBar.append(barItem);
			});

			$(document).on('click', hideAll);

			return menuBar;
		},
		hide: hideAll
	};
};