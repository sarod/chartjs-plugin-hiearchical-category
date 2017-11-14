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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chart_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__hiearchical_labels__ = __webpack_require__(2);



let HierarchicalCategoryScale = __WEBPACK_IMPORTED_MODULE_0_chart_js___default.a.Scale.extend({
  /**
    * Internal function to get the correct labels. If data.xLabels or data.yLabels are defined, use those
    * else fall back to data.labels
    * @private
    */
  getLabels: function() {
    const data = this.chart.data;
    const labels =
      this.options.labels ||
      (this.isHorizontal() ? data.xLabels : data.yLabels) ||
      data.labels;
    return labels;
  },

  determineDataLimits: function() {
    const leafLabels = Object(__WEBPACK_IMPORTED_MODULE_1__hiearchical_labels__["a" /* computeLeafLabels */])(this.getLabels());
    this.minIndex = 0;
    this.maxIndex = leafLabels.length - 1;

    var findIndex;

    this.min = leafLabels[this.minIndex];
    this.max = leafLabels[this.maxIndex];
  },

  // Generate tick marks. this.chart is the chart instance. The data object can be accessed as this.chart.data
  // buildTicks() should create a ticks array on the axis instance, if you intend to use any of the implementations from the base class
  buildTicks: function() {
    var me = this;
    const leafLabels = Object(__WEBPACK_IMPORTED_MODULE_1__hiearchical_labels__["a" /* computeLeafLabels */])(this.getLabels());
    // If we are viewing some subset of labels, slice the original array
    me.ticks =
      me.minIndex === 0 && me.maxIndex === leafLabels.length - 1
        ? leafLabels
        : leafLabels.slice(me.minIndex, me.maxIndex + 1);
  },

  // Get the value to show for the data at the given index of the the given dataset, ie this.chart.data.datasets[datasetIndex].data[index]
  getLabelForIndex: function(index, datasetIndex) {
    return "dummy" + index;
  },

  // Get the pixel (x coordinate for horizontal axis, y coordinate for vertical axis) for a given value
  // @param index: index into the ticks array
  // @param includeOffset: if true, get the pixel halway between the given tick and the next
  getPixelForTick: function(index, includeOffset) {
    return this.getPixelForValue(null, this.minIndex + index);
  },

  // Get the pixel (x coordinate for horizontal axis, y coordinate for vertical axis) for a given value
  // @param value : the value to get the pixel for
  // @param index : index into the data array of the value
  // @param datasetIndex : index of the dataset the value comes from
  // @param includeOffset : if true, get the pixel halway between the given tick and the next
  getPixelForValue: function(value, index, datasetIndex, includeOffset) {
    var me = this;
    var offset = me.options.offset;
    // 1 is added because we need the length but we have the indexes
    var offsetAmt = Math.max(
      me.maxIndex + 1 - me.minIndex - (offset ? 0 : 1),
      1
    );

    if (me.isHorizontal()) {
      var valueWidth = me.width / offsetAmt;
      var widthOffset = valueWidth * (index - me.minIndex);

      if (offset) {
        widthOffset += valueWidth / 2;
      }

      return me.left + Math.round(widthOffset);
    }
    var valueHeight = me.height / offsetAmt;
    var heightOffset = valueHeight * (index - me.minIndex);

    if (offset) {
      heightOffset += valueHeight / 2;
    }

    return me.top + Math.round(heightOffset);
  },

  // Get the value for a given pixel (x coordinate for horizontal axis, y coordinate for vertical axis)
  // @param pixel : pixel value
  getValueForPixel: function(pixel) {}
});

const defaultConfig = {};

const axisType = "hierarchical-category";

__WEBPACK_IMPORTED_MODULE_0_chart_js___default.a.scaleService.registerScaleType(
  axisType,
  HierarchicalCategoryScale,
  defaultConfig
);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = Chart;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export countLeafLabels */
/* harmony export (immutable) */ __webpack_exports__["a"] = computeLeafLabels;
/* unused harmony export validateLabels */
function countLeafLabels(rawLabels) {
  return rawLabels
    .map(element => {
      if (isString(element)) {
        return 1;
      } else if (isObjectLabelElement(element)) {
        return countLeafLabels(element.children);
      } else {
        throw new Error();
      }
    })
    .reduce((sum, value) => sum + value, 0);
}

function computeLeafLabels(rawLabels) {
  const arrayOfArrays = rawLabels.map(element => {
    if (isString(element)) {
      return [element];
    } else if (isObjectLabelElement(element)) {
      return computeLeafLabels(element.children);
    } else {
      throw new Error();
    }
  });
  return [].concat(...arrayOfArrays);
}

function validateLabels(rawLabels) {
  if (!Array.isArray(rawLabels)) {
    throw new Error("labels must be an array but was not.", rawLabels);
  }
  validateElements("", rawLabels);

  function validateElements(path, children) {
    children.forEach((element, index) => {
      const newPath = path + "[" + index + "]";
      if (typeof element === "string") {
        return;
      } else if (isObjectLabelElement(element)) {
        return validateElements(newPath, element.children);
      } else {
        throw new Error(
          "Element " +
            newPath +
            " in labels is malformed it must be either a string or an object with label and children properties.",
          element
        );
      }
      ld;
    });
  }
}

function isString(element) {
  return typeof element === "string";
}

function isObjectLabelElement(element) {
  return (
    element.hasOwnProperty("label") &&
    typeof element.label === "string" &&
    element.hasOwnProperty("children") &&
    Array.isArray(element.children)
  );
}


/***/ })
/******/ ]);