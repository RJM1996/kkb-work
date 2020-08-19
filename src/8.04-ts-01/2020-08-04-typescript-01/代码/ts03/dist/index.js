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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUser\", function() { return getUser; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUsers\", function() { return getUsers; });\n// import axios from 'axios'\nclass Axios {\n    get(url, query) {\n        return new Promise((resolve, reject) => {\n            let xhr = new XMLHttpRequest();\n            xhr.onload = function () {\n                let data = xhr.responseText;\n                resolve(data);\n            };\n            xhr.open(\"get\", url, true);\n            xhr.send();\n        });\n    }\n}\nlet axios = new Axios();\n// getUser 在封装的过程中，并不清楚具体使用中会传入的参数类型是什么？\n// 范型：为类型定义的参数\nfunction getUser(query) {\n    return axios.get(\"/user\", {\n        query,\n    });\n}\nfunction getUsers() {\n    return new Promise(() => {\n        //....\n    });\n}\n\n\n//# sourceURL=webpack:///./src/api/getUser.ts?");

/***/ }),

/***/ "./src/libs/Drag.ts":
/*!**************************!*\
  !*** ./src/libs/Drag.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Drag; });\n// 类型标注\nclass Drag {\n    constructor(el) {\n        this.el = el;\n        this.x = 0;\n        this.y = 0;\n        this.isDrag = false;\n        this.down();\n        this.move();\n        this.up();\n    }\n    down() {\n        this.el.addEventListener(\"mousedown\", (e) => {\n            console.log('mousedown');\n            this.isDrag = true;\n            this.x = e.clientX - this.el.offsetLeft;\n            this.y = e.clientY - this.el.offsetTop;\n            console.log(this.x, this.y);\n        });\n    }\n    move() {\n        this.el.addEventListener(\"mousemove\", (e) => {\n            console.log('mousemove');\n            if (this.isDrag) {\n                this.el.style.left = e.clientX - this.x + \"px\";\n                this.el.style.top = e.clientY - this.y + \"px\";\n                console.log(this.el.style.left, this.el.style.top);\n            }\n        });\n    }\n    up() {\n        this.el.addEventListener(\"mouseup\", (e) => {\n            console.log('mouseup');\n            this.isDrag = false;\n        });\n    }\n}\n\n\n//# sourceURL=webpack:///./src/libs/Drag.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_getUser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/getUser */ \"./src/api/getUser.ts\");\n/* harmony import */ var _libs_Drag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/Drag */ \"./src/libs/Drag.ts\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\nconsole.log(\"Hello TypeScript!!!\");\nlet button = document.querySelector(\"button\");\nbutton.addEventListener(\"click\", () => __awaiter(void 0, void 0, void 0, function* () {\n    let rs = yield Object(_api_getUser__WEBPACK_IMPORTED_MODULE_0__[\"getUser\"])({ id: 1 });\n    rs.username;\n    rs.age;\n    console.log(rs);\n}));\nlet ele = document.querySelector(\".ele-div\");\nlet drag = new _libs_Drag__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ele);\nconsole.log(drag);\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ })

/******/ });