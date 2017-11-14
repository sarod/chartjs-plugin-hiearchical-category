h1. Status

Sorry code is not working yet.

h1. Hiearchical category axis plugin for ChartJs 2

The goal is to add support for Hierarchical category axis to chartjs (a.k.a grouped categories or multi-level categories).

See https://github.com/chartjs/Chart.js/issues/4946

h1. Documentation


Import the plugin:
TODO

Configuring the axis:
```
xAxes: [{
    type: 'hierarchical-category',
	labels: [
          { label: 'USA', children: ['New York', 'San Francisco']}, 
          { label: 'Canada', children: ['Toronto', 'Vancouver']}],
}]
```
