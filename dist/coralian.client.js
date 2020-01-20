/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/animation.js":
/*!*************************************!*\
  !*** ./src/components/animation.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\nconst TO_DOWN = 0,\r\n\tTO_RIGHT = 1,\r\n\tTO_TOP = 2,\r\n\tTO_LEFT = 3;\r\n\r\nfunction funcInterval(speed, target, inner, direction, callback) {\r\n\r\n\treturn setInterval(function () {\r\n\t\tswitch (direction) {\r\n\t\t\tcase 0:\r\n\t\t\t\tif (target.scrollTop <= 0)\r\n\t\t\t\t\ttarget.scrollTop = inner[1].offsetHeight;\r\n\t\t\t\telse {\r\n\t\t\t\t\ttarget.scrollTop--;\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\tcase 1:\r\n\t\t\t\tif (target.scrollLeft === 0)\r\n\t\t\t\t\ttarget.scrollLeft = inner[1].offsetWidth;\r\n\t\t\t\telse {\r\n\t\t\t\t\ttarget.scrollLeft--;\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\tcase 2:\r\n\t\t\t\tif (inner[1].offsetHeight - target.scrollTop <= 0)\r\n\t\t\t\t\ttarget.scrollTop -= inner[0].offsetHeight;\r\n\t\t\t\telse {\r\n\t\t\t\t\ttarget.scrollTop++;\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\tcase 3:\r\n\t\t\t\tif (inner[1].offsetWidth - target.scrollLeft <= 0)\r\n\t\t\t\t\ttarget.scrollLeft -= inner[0].offsetWidth;\r\n\t\t\t\telse {\r\n\t\t\t\t\ttarget.scrollLeft++;\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\tdefault:\r\n\t\t\t\tthrow new Error(\"错误的方向\");\r\n\t\t}\r\n\r\n\t\tif (callback) callback();\r\n\r\n\t}, speed);\r\n}\r\n\r\nfunction setting(node, width, height, callback) {\r\n\r\n\tnode.style.width = width + \"px\";\r\n\tnode.style.height = height + \"px\";\r\n\tnode.style.overflow = node.style.overflowX = node.style.overflowY = \"hidden\";\r\n\r\n\tlet target = node.getElementsByTagName(\"div\")[0];\r\n\tif (!target) return;\r\n\r\n\tcallback(target);\r\n}\r\n\r\n/*\r\n * marquee 模块\r\n * JS Marquee Version 1.2(Javascript实现Marquee的效果,实现无缝/有间隙的二维滚动效果)\r\n * Author : ChenReal Email : chenreal@21cn.com Date : 2007-10-22 \r\n * 有修改\r\n * \r\n * id : 滚动目标的 ID\r\n * tag : 滚动目标的标签\r\n * width : 滚动范围的宽度\r\n * height : 滚动范围的高度\r\n * direction : 滚动方向：0:下->上，1:左->右，2:上->下，3:右->左\r\n * speed : 滚动速度，0最快，无最慢\r\n * space : 滚动时是否有间隙：true - 有间隙；false - 无间隙\r\n * stop : 鼠标覆盖时是否停止：true - 停止；false - 不停止\r\n */\r\nfunction marquee({ id, tag, width, height, direction, speed, space, stop }) {\r\n\r\n\tvar intervalID;\r\n\tvar target = document.getElementById(id);\r\n\r\n\tsetting(target, width, height, function (innerDiv) {\r\n\r\n\t\tinnerDiv.innerHTML += innerDiv.innerHTML;\r\n\t\tlet innerTag = innerDiv.getElementsByTagName(tag);\r\n\r\n\t\tswitch (direction) {\r\n\t\t\tcase 0:\r\n\t\t\t\tinnerDiv.style.width = width + \"px\";\r\n\t\t\t\tinnerTag[0].style.width = width + \"px\";\r\n\t\t\t\tinnerTag[1].style.width = width + \"px\";\r\n\t\t\t\tif (height >= innerTag[1].offsetHeight || space) {\r\n\t\t\t\t\tinnerTag[0].style.paddingBottom = height + \"px\";\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\tcase 1:\r\n\t\t\t\tinnerDiv.noWrap = true;\r\n\t\t\t\tif (width >= innerTag[1].offsetWidth || space) {\r\n\t\t\t\t\tinnerTag[0].style.paddingLeft = width + \"px\";\r\n\t\t\t\t\tinnerTag[1].style.paddingLeft = width + \"px\";\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\tcase 2:\r\n\t\t\t\tinnerDiv.style.width = width + \"px\";\r\n\t\t\t\tinnerTag[0].style.width = width + \"px\";\r\n\t\t\t\tinnerTag[1].style.width = width + \"px\";\r\n\t\t\t\tif (height >= innerTag[1].offsetHeight || space) {\r\n\t\t\t\t\tinnerTag[0].style.paddingTop = height + \"px\";\r\n\t\t\t\t\tinnerTag[1].style.paddingTop = height + \"px\";\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\tcase 3:\r\n\t\t\t\tinnerDiv.noWrap = true;\r\n\t\t\t\tif (width >= innerTag[1].offsetWidth || space) {\r\n\t\t\t\t\tinnerTag[0].style.paddingLeft = width + \"px\";\r\n\t\t\t\t\tinnerTag[1].style.paddingLeft = width + \"px\";\r\n\t\t\t\t}\r\n\t\t\t\tbreak;\r\n\t\t\tdefault:\r\n\t\t\t\tvar e = new Error(\"错误的方向\");\r\n\t\t\t\talert(direction);\r\n\t\t\t\talert(e.stack);\r\n\t\t\t\tthrow e;\r\n\t\t}\r\n\r\n\t\tif (stop) {\r\n\t\t\ttarget.onmouseover = function () {\r\n\t\t\t\tclearInterval(intervalID);\r\n\t\t\t};\r\n\t\t\ttarget.onmouseout = function () {\r\n\t\t\t\tintervalID = funcInterval(speed, target, innerTag, direction);\r\n\t\t\t};\r\n\t\t}\r\n\t\tintervalID = funcInterval(speed, target, innerTag, direction);\r\n\t});\r\n}\r\n\r\nexports = module.exports = {\r\n\tDirection: {\r\n\t\tTOP: TO_TOP,\r\n\t\tLEFT: TO_LEFT,\r\n\t\tRIGHT: TO_RIGHT,\r\n\t\tDOWN: TO_DOWN,\r\n\t},\r\n\tmarquee: marquee,\r\n};\n\n//# sourceURL=webpack:///./src/components/animation.js?");

/***/ }),

/***/ "./src/components/common.js":
/*!**********************************!*\
  !*** ./src/components/common.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { newWindow, doc } = __webpack_require__(/*! ./parts */ \"./src/components/parts.js\");\r\nconst dom = __webpack_require__(/*! ./dom */ \"./src/components/dom.js\");\r\n\r\nexports = module.exports = {\r\n\tcutTitle: function (str, max, cut) {\r\n\t\tif (max < str.length) {\r\n\t\t\tstr = str.slice(0, cut) + \" ......\";\r\n\t\t}\r\n\t\treturn str;\r\n\t},\r\n\tforwardTo: function (url) {\r\n\t\tlocation.href = url;\r\n\t},\r\n\tnewWindow: newWindow,\r\n\tpathArray: function () {\r\n\t\tvar path = (doc.location.href).split('/');\r\n\t\tvar arr = path[path.length - 1].split('.');\r\n\t\treturn arr;\r\n\t},\r\n\t/*\r\n\t * showPage 只负责显示页码，\r\n\t * 具体的现实样式交由外部 CSS 来自行实现\r\n\t */\r\n\tpaging: (function () {\r\n\r\n\t\tconst HtmlTag = Coralian.constants.HtmlTag;\r\n\t\tconst GO_NEXT = Coralian.constants.XmlEntity.RIGHT_ANGLE + Coralian.constants.XmlEntity.RIGHT_ANGLE,\r\n\t\t\tGO_PREV = Coralian.constants.XmlEntity.LEFT_ANGLE + Coralian.constants.XmlEntity.LEFT_ANGLE,\r\n\t\t\tGO_LAST = Coralian.constants.XmlEntity.RIGHT_ANGLE + \"|\",\r\n\t\t\tGO_FIRST = Coralian.constants.XmlEntity.LEFT_ANGLE + \"|\";\r\n\r\n\t\tfunction loading(name) {\r\n\t\t\tlet p = dom.create(HtmlTag.P, {\r\n\t\t\t\t'class': 'onload'\r\n\t\t\t}, `${name} 数据载入中`);\r\n\r\n\t\t\tp.append('<img src=\"/res/imgs/default/loading.gif\" title=\"loading\" />');\r\n\r\n\t\t\treturn p;\r\n\t\t}\r\n\r\n\t\tfunction failed(name) {\r\n\t\t\treturn dom.create(HtmlTag.P, {\r\n\t\t\t\t'class': 'onload'\r\n\t\t\t}, `${name} 数据载入失败`);\r\n\t\t}\r\n\r\n\t\tfunction showLoop(pages, reqArg, start, now, end) {\r\n\r\n\t\t\tif (end === 0) {\r\n\t\t\t\tpages.append(dom.create(HtmlTag.SPAN, {\r\n\t\t\t\t\tclass: 'nowpage',\r\n\t\t\t\t\ttitle: '当前页'\r\n\t\t\t\t}));\r\n\t\t\t} else {\r\n\t\t\t\tfor (; start < end; start++) {\r\n\t\t\t\t\tif (start !== now) {\r\n\t\t\t\t\t\tpages.append(dom.create(HtmlTag.A, {\r\n\t\t\t\t\t\t\t'class': 'showpage',\r\n\t\t\t\t\t\t\thref: toPageJs(reqArg, start),\r\n\t\t\t\t\t\t\ttitle: '前往第 ' + (start + 1) + ' 页'\r\n\t\t\t\t\t\t}, start + 1));\r\n\t\t\t\t\t\t// pages.append('<a class=\"showpage\" href=\"javascript:front.page.show(' + changeId + ',' + start +\r\n\t\t\t\t\t\t// \t')\" title=\"前往第 ' + (start + 1) + ' 页\">' + (start + 1) + '</a>');\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tpages.append(dom.create(HtmlTag.SPAN, {\r\n\t\t\t\t\t\t\tclass: 'nowpage',\r\n\t\t\t\t\t\t\ttitle: '当前页 (' + now + 1 + '）'\r\n\t\t\t\t\t\t}, now + 1));\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t}\r\n\r\n\t\tconst MORE_NODE = \"...\";\r\n\r\n\t\tfunction toFirstJs(reqArg) {\r\n\t\t\treturn `javascript: front.paging.change(${reqArg}, 0)`;\r\n\t\t}\r\n\r\n\t\tfunction toLastJs(reqArg, total) {\r\n\t\t\treturn `javascript: front.paging.change(${reqArg}, ${total})`;\r\n\t\t}\r\n\r\n\t\tfunction toPageJs(reqArg, now) {\r\n\t\t\treturn `javascript: front.paging.change(${reqArg}, ${now})`\r\n\t\t}\r\n\r\n\t\tfunction paging(...id) {\r\n\r\n\t\t\tlet pages = $(`#${id}`);\r\n\t\t\tlet reqArg = null;\r\n\r\n\r\n\t\t\tfunction clear() {\r\n\t\t\t\tpages.empty();\r\n\t\t\t}\r\n\r\n\t\t\treturn {\r\n\t\t\t\tinit: (arg) => {\r\n\r\n\t\t\t\t\treqArg = arg;\r\n\t\t\t\t\treturn pages; // 如果有外部创建好的对象，则可以不用去管这里的返回值\r\n\t\t\t\t},\r\n\t\t\t\tshow: (now, total) => {\r\n\r\n\t\t\t\t\tclear(); // 每次都要先清空内部元素\r\n\r\n\t\t\t\t\t/*\r\n\t\t\t\t\t * total <= 10 一口气全部显示，且没随机页面跳转\r\n\t\t\t\t\t * \r\n\t\t\t\t\t * 1 2 3 4 5 6 7 8 9 10\r\n\t\t\t\t\t */\r\n\t\t\t\t\tif (total < 10) {\r\n\t\t\t\t\t\tshowLoop(pages, changeId, 0, now, total + 1);\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\t/*\r\n\t\t\t\t\t\t * total > 10 && now < 5\r\n\t\t\t\t\t\t * \r\n\t\t\t\t\t\t * 1 2 3 4 5 ... >> >|\r\n\t\t\t\t\t\t */\r\n\t\t\t\t\t\tif (now < 4) { // 写4的原因是在按到5时，已经是最后一页，所以需要进行换页操作，使用下一种表法方式来表达\r\n\t\t\t\t\t\t\tshowLoop(pages, reqArg, 0, now, 5);\r\n\t\t\t\t\t\t\tpages.append(MORE_NODE);\r\n\t\t\t\t\t\t\tpages.append(dom.create(HtmlTag.A, {\r\n\t\t\t\t\t\t\t\t'class': \"nextpage\",\r\n\t\t\t\t\t\t\t\t'href': toPageJs(reqArg, now + 1, total),\r\n\t\t\t\t\t\t\t\ttitle: '前往下一页（' + (now + 2) + '）'\r\n\t\t\t\t\t\t\t}, GO_NEXT));\r\n\t\t\t\t\t\t\tpages.append(dom.create(HtmlTag.A, {\r\n\t\t\t\t\t\t\t\t'class': \"toend\",\r\n\t\t\t\t\t\t\t\t'href': toLastJs(reqArg, total),\r\n\t\t\t\t\t\t\t\ttitle: '前往最终页（' + (total + 1) + '）'\r\n\t\t\t\t\t\t\t}, GO_LAST));\r\n\t\t\t\t\t\t\t// pages.append('<a class=\"nextpage\" href=\"javascript:front.page.show(' + changeId + ',' + (now + 1) +\r\n\t\t\t\t\t\t\t// \t')\" title=\"前往下一页（' + (now + 2) + '）\">&gt&gt</a>');\r\n\t\t\t\t\t\t\t// pages.append('<a class=\"toend\" href=\"javascript:front.page.show(' + changeId + ',' + total +\r\n\t\t\t\t\t\t\t// \t')\" title=\"前往最终页（' + (total + 1) + '）\">&gt|</a>');\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t/*\r\n\t\t\t\t\t\t * total > 10 && now > total - 5\r\n\t\t\t\t\t\t * \r\n\t\t\t\t\t\t * |< << ... 19 20 21 22 23\r\n\t\t\t\t\t\t */\r\n\t\t\t\t\t\telse if (total - 4 < now) {\r\n\t\t\t\t\t\t\tpages.append(dom.create(HtmlTag.A, {\r\n\t\t\t\t\t\t\t\t'class': \"tofirst\",\r\n\t\t\t\t\t\t\t\t'href': toFirstJs(reqArg),\r\n\t\t\t\t\t\t\t\ttitle: '前往第一页'\r\n\t\t\t\t\t\t\t}, GO_LAST));\r\n\t\t\t\t\t\t\tpages.append(dom.create(HtmlTag.A, {\r\n\t\t\t\t\t\t\t\t'class': \"prevpage\",\r\n\t\t\t\t\t\t\t\t'href': toPageJs(reqArg, now - 1),\r\n\t\t\t\t\t\t\t\ttitle: '\"前往上一页（' + now + '）'\r\n\t\t\t\t\t\t\t}, GO_PREV));\r\n\t\t\t\t\t\t\t// pages.append('<a class=\"tofirst\" href=\"javascript:front.page.show(' + changeId +\r\n\t\t\t\t\t\t\t// \t',0)\" title=\"前往第一页\">|&lt;</a>');\r\n\t\t\t\t\t\t\t// pages.append('<a class=\"prevpage\" href=\"javascript:front.page.show(' + changeId + ',' + (now - 1) +\r\n\t\t\t\t\t\t\t// \t')\" title=\"前往上一页（' + now + '）\">&lt;&lt;</a>');\r\n\t\t\t\t\t\t\tpages.append(MORE_NODE);\r\n\t\t\t\t\t\t\tshowLoop(pages, reqArg, total - 4, now, total + 1);\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t\t/*\r\n\t\t\t\t\t\t * total > 10 && now < total - 5\r\n\t\t\t\t\t\t * \r\n\t\t\t\t\t\t * |< << ... 13 14 15 16 17 ... >> >|\r\n\t\t\t\t\t\t */\r\n\t\t\t\t\t\telse {\r\n\r\n\t\t\t\t\t\t\tpages.append(dom.create(HtmlTag.A, {\r\n\t\t\t\t\t\t\t\t\"javascript\": toFirstJs(reqArg),\r\n\t\t\t\t\t\t\t\t'title': \"前往第一页\"\r\n\t\t\t\t\t\t\t}, GO_FIRST));\r\n\t\t\t\t\t\t\tpages.append(dom.create(HtmlTag.A, {\r\n\t\t\t\t\t\t\t\t\"javascript\": toPageJs(reqArg, now - 1),\r\n\t\t\t\t\t\t\t\t'title': '前往上一页（' + now + '）'\r\n\t\t\t\t\t\t\t}, GO_PREV));\r\n\r\n\t\t\t\t\t\t\tpages.append(MORE_NODE);\r\n\t\t\t\t\t\t\tshowLoop(pages, reqArg, now - 2, now, now + 3);\r\n\t\t\t\t\t\t\tpages.append(MORE_NODE);\r\n\r\n\t\t\t\t\t\t\tpages.append(dom.create(HtmlTag.A, {\r\n\t\t\t\t\t\t\t\t\"javascript\": toPageJs(reqArg, now + 1),\r\n\t\t\t\t\t\t\t\t'title': '前往下一页（' + (now + 2) + '）'\r\n\t\t\t\t\t\t\t}, GO_NEXT));\r\n\t\t\t\t\t\t\tpages.append(dom.create(HtmlTag.A, {\r\n\t\t\t\t\t\t\t\t'href': toLastJs(reqArg, total),\r\n\t\t\t\t\t\t\t\t'title': '前往最终页（' + (total + 1) + '）'\r\n\t\t\t\t\t\t\t}, GO_LAST));\r\n\r\n\t\t\t\t\t\t\t// pages.append('<a href=\"javascript:front.page.show(' + changeId + ',0)\" title=\"前往第一页\">|&lt;</a>');\r\n\t\t\t\t\t\t\t// pages.append('<a href=\"javascript:front.page.show(' + changeId + ',' + (now - 1) +\r\n\t\t\t\t\t\t\t// \t')\" title=\"前往上一页（' + now + '）\">&lt;&lt;</a>');\r\n\t\t\t\t\t\t\t// pages.append(MORE_NODE);\r\n\t\t\t\t\t\t\t// \r\n\t\t\t\t\t\t\t// pages.append(MORE_NODE);\r\n\t\t\t\t\t\t\t// pages.append('<a class=\"nextpage\" href=\"javascript:front.page.show(' + changeId + ',' + (now + 1) +\r\n\t\t\t\t\t\t\t// \t')\" title=\"前往下一页（' + (now + 2) + '）\">&gt;&gt;</a>');\r\n\t\t\t\t\t\t\t// pages.append('<a class=\"toend\" href=\"javascript:front.page.show(' + changeId + ',' + total +\r\n\t\t\t\t\t\t\t// \t')\" title=\"前往最终页（' + (total + 1) + '）\">&gt|</a>');\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t},\r\n\t\t\t\tloading: function (name) {\r\n\t\t\t\t\tclear();\r\n\t\t\t\t\tpages.append(loading(name));\r\n\t\t\t\t},\r\n\t\t\t\tfailed: function (name) {\r\n\t\t\t\t\tclear();\r\n\t\t\t\t\tpages.append(failed(name));\r\n\t\t\t\t}\r\n\t\t\t};\r\n\t\t}\r\n\r\n\t\tpaging.getLoading = function (name) {\r\n\t\t\treturn loading(name);\r\n\t\t};\r\n\t\tpaging.getFailed = function (name) {\r\n\t\t\treturn failed(name);\r\n\t\t};\r\n\r\n\t\treturn paging;\r\n\t})()\r\n}\n\n//# sourceURL=webpack:///./src/components/common.js?");

/***/ }),

/***/ "./src/components/dom.js":
/*!*******************************!*\
  !*** ./src/components/dom.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = exports = {\r\n\tcreate: function (tag, attr, html) {\r\n\t\tvar element = $(`<${tag}></${tag}>`);\r\n\t\tif (typeIs(attr, 'string')) {\r\n\t\t\thtml = attr;\r\n\t\t\tattr = null;\r\n\t\t}\r\n\t\tif (!Object.isEmpty(attr)) {\r\n\t\t\telement.attr(attr);\r\n\t\t}\r\n\t\tif (html) {\r\n\t\t\telement.html(html);\r\n\t\t}\r\n\t\treturn element;\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/components/dom.js?");

/***/ }),

/***/ "./src/components/form.js":
/*!********************************!*\
  !*** ./src/components/form.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$.fn.parseForm = function () {\r\n\tvar serializeObj = {};\r\n\tvar array = this.serializeArray();\r\n\t$(array).each(function () {\r\n\t\tif (serializeObj[this.name]) {\r\n\t\t\tif ($.isArray(serializeObj[this.name])) {\r\n\t\t\t\tserializeObj[this.name].push(this.value);\r\n\t\t\t} else {\r\n\t\t\t\tserializeObj[this.name] = [serializeObj[this.name], this.value];\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\tserializeObj[this.name] = this.value;\r\n\t\t}\r\n\t});\r\n\treturn serializeObj;\r\n};\r\n\r\nmodule.exports = function (index = 0) {\r\n\r\n\tlet frm = $(document.forms[index]);\r\n\r\n\treturn {\r\n\t\treset: function () {\r\n\t\t\tfrm[0].reset();\r\n\t\t},\r\n\t\tsubmit: function (url, before, after) {\r\n\r\n\t\t\tvar data = frm.parseForm();\r\n\t\t\t// 前切片\r\n\t\t\tif (!!before) {\r\n\t\t\t\tvar result = before(data);\r\n\t\t\t\t// 当返回 false 的时候，直接退出博客提交\r\n\t\t\t\tif (!result) return;\r\n\t\t\t}\r\n\r\n\t\t\t$.post({\r\n\t\t\t\turl: url,\r\n\t\t\t\tdata: data,\r\n\t\t\t\tparse: true,\r\n\t\t\t\tdataType: \"json\",\r\n\t\t\t\tsuccess: function (req) {\r\n\t\t\t\t\t// 后切片\r\n\t\t\t\t\tif (after) after(req);\r\n\t\t\t\t}\r\n\t\t\t});\r\n\t\t}\r\n\t};\r\n};\n\n//# sourceURL=webpack:///./src/components/form.js?");

/***/ }),

/***/ "./src/components/image.js":
/*!*********************************!*\
  !*** ./src/components/image.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { getScrollTop, doc } = __webpack_require__(/*! ./parts */ \"./src/components/parts.js\");\r\n\r\nvar album = doc.createElement('div');\r\nalbum.zIndex = \"2\";\r\nalbum.style.position = \"absolute\";\r\nvar img = doc.createElement('img');\r\nalbum.onclick = Function.EMPTY_BODY;\r\nvar background = doc.createElement('div');\r\nbackground.onclick = close;\r\nvar body = null;\r\n\r\nfunction close() {\r\n\talbum.removeChild(img);\r\n\tbody.remove(album);\r\n\tbody.remove(background);\r\n}\r\n\r\nexports = module.exports = {\r\n\tresize: function (obj) {\r\n\t\tobj.proto = {\r\n\t\t\twidth: obj.width,\r\n\t\t\theight: obj.height\r\n\t\t};\r\n\t\tif (obj.width > 800) {\r\n\t\t\tobj.width = 800;\r\n\t\t}\r\n\t},\r\n\tprotoSize: function (obj) {\r\n\r\n\t\tvar scrollHeight = doc.documentElement.scrollHeight; // 滚动条高度，也就是整个页面的高度\r\n\r\n\t\tif (body === null) {\r\n\t\t\tbody = $(\"body\");\r\n\t\t\tbackground.zIndex = \"1\";\r\n\t\t\tbackground.style.width = \"100%\";\r\n\t\t\tbackground.style.height = scrollHeight + \"px\";\r\n\t\t\tbackground.style.background = \"#000000\";\r\n\t\t\tbackground.style.opacity = \"0.85\";\r\n\t\t\tbackground.style.position = \"absolute\";\r\n\t\t\tbackground.style.left = \"0px\";\r\n\t\t\tbackground.style.top = \"0px\";\r\n\t\t}\r\n\t\tvar innerHeight = window.innerHeight; // 页面可视高度\r\n\t\tvar innerWidth = window.innerWidth; // 页面可视宽度\r\n\t\tvar protoHeight = obj.proto.height; // 图像原始高度\r\n\t\tvar protoWidth = obj.proto.width; // 图像原始宽度\r\n\t\tvar top, left;\r\n\t\tif (protoHeight < innerHeight) { // 图像高度 < 页面可视高度\r\n\t\t\t// 页面正中显示\r\n\t\t\ttop = (innerHeight - protoHeight) / 2;\r\n\t\t} else { // 图像高度>页面可视\r\n\t\t\t// 页面上下 padding 40px 显示\r\n\t\t\ttop = 40;\r\n\t\t\tif (protoHeight > scrollHeight - 80) { // 图像高度 > 滚动条高度-80\r\n\t\t\t\t//  页面上下 padding 40px 显示，且页面高度加到适合图像高度\r\n\t\t\t\tbackground.style.height = (protoHeight + 80) + \"px\";\r\n\t\t\t}\r\n\t\t\t// 图像高度 < 滚动条高度-80不做任何处理\r\n\t\t}\r\n\r\n\t\tif (protoWidth < innerWidth) { // 图像宽度 < 页面可视宽度\r\n\t\t\t// 页面正中显示\r\n\t\t\tleft = (innerWidth - protoWidth) / 2;\r\n\t\t} else {\r\n\t\t\t// 调节滚动条宽度\r\n\t\t\tbackground.style.width = protoWidth + \"80px\";\r\n\t\t\tleft = 40;\r\n\t\t}\r\n\r\n\t\talbum.style.top = Math.ceil(getScrollTop() + top) + \"px\";\r\n\t\talbum.style.left = Math.ceil(left) + \"px\";\r\n\r\n\t\timg.src = obj.src;\r\n\t\timg.height = protoHeight;\r\n\t\timg.width = protoWidth;\r\n\t\timg.title = obj.title;\r\n\r\n\t\tbody.append(background);\r\n\t\talbum.appendChild(img);\r\n\t\tbody.append(album);\r\n\t},\r\n\tcloseAlbum: close\r\n};\n\n//# sourceURL=webpack:///./src/components/image.js?");

/***/ }),

/***/ "./src/components/menu.js":
/*!********************************!*\
  !*** ./src/components/menu.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * 1. 每一层即都可以是叶节点，也可以是父节点\r\n * 2. 数据只确定结构\r\n * 3. 动作由外部数据构成\r\n\r\n 数据结构如下：\r\n[\r\n\t{\r\n\t\tname: 'img',\r\n\t\ttitle: '图片'\r\n\t},\r\n\t{\r\n\t\tname: 'align',\r\n\t\ttitle: '对齐方式',\r\n\t\tlist: [\r\n\t\t\t{\r\n\t\t\t\tname: \"alignleft\",\r\n\t\t\t\ttitle: '左对齐'\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\tname: \"aligncenter\",\r\n\t\t\t\ttitle: '居中对齐'\r\n\t\t\t},\r\n\t\t\t{\r\n\t\t\t\tname: \"alignright\",\r\n\t\t\t\ttitle: '右对齐'\r\n\t\t\t}\r\n\t\t]\r\n\t}\r\n]\r\n\r\n动作结构如下：\r\n{\r\n\talignleft: function() {\r\n\r\n\t}\r\n}\r\n */\r\nmodule.exports = exports = function () {\r\n\r\n\tlet nodeList = []; // 所有子节点\r\n\r\n\tfunction override(layer, list, subList) {\r\n\r\n\t\t// 隐藏的时候，需要隐藏所有子节点\r\n\t\tCoralian.util.ObjectUtil.override(list, 'hide', (callback) => function () {\r\n\r\n\t\t\tisOpen = false; // 隐藏的时候，关闭显示开关\r\n\r\n\t\t\tArray.forEach(subList, (i, item) => { // 递归隐藏子节点\r\n\t\t\t\titem.hide();\r\n\t\t\t});\r\n\r\n\t\t\tcallback();\r\n\t\t});\r\n\r\n\t\t// 显示的时候，只要显示当前层和当前层的下一层就可以了\r\n\t\tCoralian.util.ObjectUtil.override(list, 'show', (callback) => function (index) {\r\n\r\n\t\t\t// 因为子节点也同样实现了当前这个被覆盖过的 show 方法\r\n\t\t\t// 所以这里会产生递归调用，需要通过输入的层号和当前所在层号一致来判断是否是目标层\r\n\t\t\t// 如果不是当前层，则什么都不做，来中止递归调用\r\n\t\t\tif (index !== layer) return;\r\n\r\n\t\t\tcallback();// 显示当前层\r\n\r\n\t\t\t// 显示当前层的下一层\r\n\t\t\tArray.forEach(subList, (i, item) => {\r\n\t\t\t\titem.show(index); // 将需要显示的目标层号向下传递\r\n\t\t\t});\r\n\t\t});\r\n\t}\r\n\r\n\tfunction createTag(tag, val, attr) {\r\n\t\tif (typeIs(val, 'undefined')) {\r\n\t\t\tval = String.BLANK;\r\n\t\t}\r\n\t\tif (typeIs(val, 'object')) {\r\n\t\t\tattr = val;\r\n\t\t\tval = String.BLANK;\r\n\t\t}\r\n\t\tlet element = $(`<${tag}>${val}</${tag}>`);\r\n\t\tif (attr) {\r\n\t\t\telement.attr(attr);\r\n\t\t}\r\n\r\n\t\treturn element;\r\n\t}\r\n\r\n\tfunction createChild(layer, data, events) { // 所有目录和下级目录\r\n\r\n\t\tlet listItems = [];\r\n\r\n\t\tlet list = createTag(Coralian.constants.HtmlTag.UL, {\r\n\t\t\t'class': `menu_list ${data.name}`,\r\n\t\t\tid: `menu_list_${data.name}`,\r\n\t\t\tstyle: \"margin-left:\" + (!!layer ? 106 : -3) + \"px; margin-top:\" + (!!layer ? -2 : 1.6) + \"rem\"\r\n\t\t});\r\n\r\n\t\tlet isOpen = false; // 每个下拉菜单都有一个 isOpen 属性\r\n\t\tlist.hide(); // 初始状态隐藏自己\r\n\t\tlist.isOpen = () => isOpen;\r\n\r\n\t\toverride(layer, list, listItems);\r\n\r\n\t\tArray.forEach(data.list, (i, subData) => {\r\n\r\n\t\t\tlet listItem = createTag(Coralian.constants.HtmlTag.LI, {\r\n\t\t\t\t'class': `list_menu`,\r\n\t\t\t\tid: `list_menu_${data.name}`,\r\n\t\t\t});\r\n\t\t\tlet button = createTag(Coralian.constants.HtmlTag.DIV, subData.title);\r\n\t\t\tlistItem.append(button);\r\n\t\t\tlet subLists = [];\r\n\r\n\t\t\toverride(layer, listItem, subLists);\r\n\r\n\t\t\tif (subData.list) {\r\n\t\t\t\tvar subList = createChild(layer + 1, subData, events);\r\n\t\t\t\tlistItem.append(subList); // 循环递归创建子目录\r\n\t\t\t\tsubLists.push(subList);\r\n\r\n\t\t\t\tbutton.attr({\r\n\t\t\t\t\t'style': 'background-image:url(./../icons/arr_r_b.png);background-position:right center;background-repeat:no-repeat;'\r\n\t\t\t\t});\r\n\r\n\t\t\t\tbutton.on('click', (event) => {\r\n\r\n\t\t\t\t\tevent.stopPropagation();\r\n\r\n\t\t\t\t\tif (subList.isOpen()) { // 子列表未开放\r\n\t\t\t\t\t\tsubList.hide(); // 隐藏列表\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tArray.forEach(listItems, (i, tmpItem) => {\r\n\t\t\t\t\t\t\tif (listItem !== tmpItem) {\r\n\t\t\t\t\t\t\t\ttmpItem.hide(); // 隐藏其他所有同级列表\r\n\t\t\t\t\t\t\t\ttmpItem.show(layer); // 重新显示列表\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t})\r\n\t\t\t\t\t\tsubList.show(layer + 1); // 显示子列表\r\n\t\t\t\t\t}\r\n\t\t\t\t});\r\n\t\t\t} else {\r\n\t\t\t\tlistItem.on('click', (event) => {\r\n\t\t\t\t\thideAll(event);\r\n\t\t\t\t\tevents[subData.name](event);\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t\tlist.append(listItem);\r\n\t\t\tlistItems.push(listItem);\r\n\t\t});\r\n\r\n\t\treturn list;\r\n\t}\r\n\r\n\tfunction hideAll(event) {\r\n\t\tif (event) {\r\n\t\t\tevent.stopPropagation();\r\n\t\t}\r\n\t\t// 隐藏所有列表\r\n\t\tArray.forEach(nodeList, (i, node) => {\r\n\t\t\tnode.hide();\r\n\t\t});\r\n\t}\r\n\r\n\treturn {\r\n\t\tcreate: (data, events) => {\r\n\t\t\tlet menuBar = createTag(Coralian.constants.HtmlTag.DIV, {\r\n\t\t\t\tid: 'menubar_box',\r\n\t\t\t\tclass: 'menubar_box'\r\n\t\t\t}); // 创建 root 节点\r\n\r\n\t\t\tArray.forEach(data, (i, itemData) => {\r\n\r\n\t\t\t\tlet barItem = createTag(Coralian.constants.HtmlTag.DIV, {\r\n\t\t\t\t\t'class': 'menubar_item'\r\n\t\t\t\t}); // 节点\r\n\t\t\t\tlet button = createTag(Coralian.constants.HtmlTag.DIV, itemData.title); // 按钮\r\n\r\n\t\t\t\tif (itemData.list) {\r\n\t\t\t\t\tlet child = createChild(0, itemData, events); // 创建子节点\r\n\t\t\t\t\tbarItem.append(child);\r\n\t\t\t\t\tnodeList.push(child);\r\n\r\n\t\t\t\t\tbutton.on('click', (event) => {\r\n\t\t\t\t\t\thideAll(event);\r\n\t\t\t\t\t\tchild.show(0); // 仅显示当前列表\r\n\t\t\t\t\t});\r\n\t\t\t\t} else {\r\n\t\t\t\t\tbutton.on('click', (event) => {\r\n\t\t\t\t\t\thideAll(event);\r\n\t\t\t\t\t\tevents[itemData.name](event); // 执行事件\r\n\t\t\t\t\t});\r\n\t\t\t\t}\r\n\r\n\t\t\t\tbarItem.append(button);\r\n\t\t\t\tmenuBar.append(barItem);\r\n\t\t\t});\r\n\r\n\t\t\t$(document).on('click', hideAll);\r\n\r\n\t\t\treturn menuBar;\r\n\t\t},\r\n\t\thide: hideAll\r\n\t};\r\n};\n\n//# sourceURL=webpack:///./src/components/menu.js?");

/***/ }),

/***/ "./src/components/parts.js":
/*!*********************************!*\
  !*** ./src/components/parts.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\n * 因为客户端 会用到 HTMLCollection 这些只有浏览器中才会出现的元素，\r\n * 所以先把 forEach 这个方法覆盖掉\r\n */\r\nCoralian.util.ObjectUtil.override(Object, 'forEach', function (method) {\r\n\treturn function (obj, callback) {\r\n\t\tif (obj instanceof HTMLCollection) {\r\n\t\t\tfor (let i = 0, len = obj.length; i < len; i++) {\r\n\t\t\t\tlet result = callback(i, obj[i]);\r\n\t\t\t\tif (false === result) break;\r\n\t\t\t\tif (true === result) continue;\r\n\t\t\t}\r\n\t\t} else {\r\n\t\t\treturn method(obj, callback);\r\n\t\t}\r\n\t}\r\n});\r\n\r\nfunction getScrollTop() {\r\n\treturn document.body.scrollTop || document.documentElement.scrollTop;\r\n}\r\nexports.getScrollTop = getScrollTop;\r\n\r\nfunction newWindow() {\r\n\treturn window.open.apply(null, arguments);\r\n}\r\nexports.newWindow = newWindow;\r\n\r\nexports.doc = document;\n\n//# sourceURL=webpack:///./src/components/parts.js?");

/***/ }),

/***/ "./src/components/screen.js":
/*!**********************************!*\
  !*** ./src/components/screen.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { getScrollTop, doc } = __webpack_require__(/*! ./parts */ \"./src/components/parts.js\");\r\n\r\nexports = module.exports = {\r\n\t/*\r\n\t * 代码来源：https://www.zybuluo.com/EncyKe/note/254250\r\n\t * 有修改\r\n\t */\r\n\ttoPageTop: function () {\r\n\r\n\t\tvar toTop = getScrollTop();\r\n\r\n\t\t// 设置计时器，50毫秒间隔；\r\n\t\tvar toTopTimer = setInterval(function () {\r\n\r\n\t\t\t// 设置速度，用等式而不用具体数值是为了产生缓动效果；\r\n\t\t\ttoTop -= Math.ceil(toTop / 5);\r\n\r\n\t\t\t// 作差，产生缓动效果；\r\n\t\t\tdoc.documentElement.scrollTop = doc.body.scrollTop = toTop;\r\n\t\t\t// 判断是否抵达顶部，若是，停止计时器；\r\n\t\t\tif (toTop <= 0) {\r\n\t\t\t\tclearInterval(toTopTimer);\r\n\t\t\t};\r\n\t\t}, 50);\r\n\t},\r\n\tgetScrollTop: getScrollTop,\r\n\tgetOffsetTop: function (o) {\r\n\r\n\t\tvar top = 0;\r\n\t\tvar offsetParent = o;\r\n\r\n\t\twhile (offsetParent != null && offsetParent != document.body) {\r\n\r\n\t\t\ttop += offsetParent.offsetTop;\r\n\t\t\toffsetParent = offsetParent.offsetParent;\r\n\t\t}\r\n\r\n\t\treturn top;\r\n\t},\r\n\tstopOnScreen: (function () {\r\n\r\n\t\tvar elements = {};\r\n\t\telements.id = [];\r\n\t\twindow.onscroll = function () {\r\n\t\t\tvar top = getScrollTop();\r\n\t\t\tvar id = elements.id;\r\n\t\t\tfor (let i = 0, len = id.length; i < len; i++) {\r\n\t\t\t\tlet element = elements[id[i]];\r\n\r\n\t\t\t\ttop = top - element.top;\r\n\t\t\t\tif (top > 0) {\r\n\t\t\t\t\telement.element.style.top = top + \"px\";\r\n\t\t\t\t} else {\r\n\t\t\t\t\telement.element.style.top = 0 + \"px\";\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\treturn function (id, top) {\r\n\t\t\tif (!elements[id]) {\r\n\t\t\t\telements[id] = {\r\n\t\t\t\t\ttop: top,\r\n\t\t\t\t\telement: $dom.getNode(id)\r\n\t\t\t\t};\r\n\t\t\t\telements.id.push(id);\r\n\t\t\t}\r\n\t\t};\r\n\t})()\r\n};\n\n//# sourceURL=webpack:///./src/components/screen.js?");

/***/ }),

/***/ "./src/components/validator.js":
/*!*************************************!*\
  !*** ./src/components/validator.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const WHITE = {\r\n\tbackground: '#FFFFFF'\r\n},\r\n\tRED = {\r\n\t\tbackground: '#FF0000'\r\n\t};\r\n\r\nfunction validateBlur(key) {\r\n\t$(`#${key}`).css(WHITE);\r\n}\r\n\r\nfunction validateFocus(key) {\r\n\t$(`#${key}`).focus();\r\n}\r\n\r\nfunction validateOnError({ key, msg }) {\r\n\tif (!msg) return;\r\n\r\n\tlet $$ = $(`#${key}`);\r\n\r\n\t$$.css(RED);\r\n\talert(msg);\r\n\t$$.focus();\r\n\r\n\t$$.on('blur', function () {\r\n\t\tif (!String.isEmpty($$.val())) {\r\n\t\t\t$$.css(WHITE);\r\n\t\t}\r\n\t});\r\n}\r\n\r\nmodule.exports = exports = {\r\n\tonError: validateOnError,\r\n\tblur: validateBlur,\r\n\tfocus: validateFocus\r\n};\n\n//# sourceURL=webpack:///./src/components/validator.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("Coralian.browserOnly();\r\n\r\nCoralian.client = {\r\n\tanimation: __webpack_require__(/*! ./components/animation */ \"./src/components/animation.js\"),\r\n\tcommon: __webpack_require__(/*! ./components/common */ \"./src/components/common.js\"),\r\n\tdom: __webpack_require__(/*! ./components/dom */ \"./src/components/dom.js\"),\r\n\tform: __webpack_require__(/*! ./components/form */ \"./src/components/form.js\"),\r\n\tImage: __webpack_require__(/*! ./components/image */ \"./src/components/image.js\"),\r\n\tscreen: __webpack_require__(/*! ./components/screen */ \"./src/components/screen.js\"),\r\n\tValidator: __webpack_require__(/*! ./components/validator */ \"./src/components/validator.js\"),\r\n\tMenu: __webpack_require__(/*! ./components/menu */ \"./src/components/menu.js\")\r\n};\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });