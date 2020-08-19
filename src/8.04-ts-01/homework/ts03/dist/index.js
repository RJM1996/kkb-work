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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/getUser.ts":
/*!****************************!*\
  !*** ./src/api/getUser.ts ***!
  \****************************/
/*! exports provided: getUser, getUsers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUser\", function() { return getUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUsers\", function() { return getUsers; });\n// import axios from 'axios'\r\nclass Axios {\r\n    get(url, query) {\r\n        return new Promise((resolve, reject) => {\r\n            let xhr = new XMLHttpRequest();\r\n            xhr.onload = function () {\r\n                let data = xhr.responseText;\r\n                resolve(data);\r\n            };\r\n            xhr.open(\"get\", url, true);\r\n            xhr.send();\r\n        });\r\n    }\r\n}\r\nlet axios = new Axios();\r\n// getUser 在封装的过程中，并不清楚具体使用中会传入的参数类型是什么？\r\n// 范型：为类型定义的参数\r\nfunction getUser(query) {\r\n    return axios.get(\"/user\", {\r\n        query,\r\n    });\r\n}\r\nfunction getUsers() {\r\n    return new Promise(() => {\r\n        //....\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/api/getUser.ts?");

/***/ }),

/***/ "./src/libs/Drag.ts":
/*!**************************!*\
  !*** ./src/libs/Drag.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Drag; });\n// 类型标注\r\nclass Drag {\r\n    constructor(el) {\r\n        this.el = el;\r\n        this.x = 0;\r\n        this.y = 0;\r\n        this.isDrag = false;\r\n        this.down();\r\n        this.move();\r\n        this.up();\r\n    }\r\n    down() {\r\n        this.el.addEventListener(\"mousedown\", (e) => {\r\n            console.log('mousedown');\r\n            this.isDrag = true;\r\n            this.x = e.clientX - this.el.offsetLeft;\r\n            this.y = e.clientY - this.el.offsetTop;\r\n            console.log(this.x, this.y);\r\n        });\r\n    }\r\n    move() {\r\n        this.el.addEventListener(\"mousemove\", (e) => {\r\n            console.log('mousemove');\r\n            if (this.isDrag) {\r\n                this.el.style.left = e.clientX - this.x + \"px\";\r\n                this.el.style.top = e.clientY - this.y + \"px\";\r\n                console.log(this.el.style.left, this.el.style.top);\r\n            }\r\n        });\r\n    }\r\n    up() {\r\n        this.el.addEventListener(\"mouseup\", (e) => {\r\n            console.log('mouseup');\r\n            this.isDrag = false;\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/libs/Drag.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_getUser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/getUser */ \"./src/api/getUser.ts\");\n/* harmony import */ var _libs_Drag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/Drag */ \"./src/libs/Drag.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\nconsole.log(\"荣俊铭\");\r\nlet button = document.querySelector(\"button\");\r\nbutton.addEventListener(\"click\", () => __awaiter(void 0, void 0, void 0, function* () {\r\n    let rs = yield Object(_api_getUser__WEBPACK_IMPORTED_MODULE_0__[\"getUser\"])({ id: 1 });\r\n    rs.username;\r\n    rs.age;\r\n    console.log(rs);\r\n}));\r\nlet ele = document.querySelector(\".ele-div\");\r\nlet drag = new _libs_Drag__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ele);\r\nconsole.log(drag);\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });