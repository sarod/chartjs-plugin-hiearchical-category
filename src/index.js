import Chart from "chart.js";
import { countLeafLabels, computeLeafLabels } from "./hiearchical-labels";

let HierarchicalCategoryScale = Chart.Scale.extend({
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
    const leafLabels = computeLeafLabels(this.getLabels());
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
    const leafLabels = computeLeafLabels(this.getLabels());
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

Chart.scaleService.registerScaleType(
  axisType,
  HierarchicalCategoryScale,
  defaultConfig
);
