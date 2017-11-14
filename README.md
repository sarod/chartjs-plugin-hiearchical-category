# Status

Sorry code is not working yet.

# Hiearchical category axis plugin for ChartJs 2

The goal is to add support for Hierarchical category axis to chartjs (a.k.a grouped categories or multi-level categories).

See https://github.com/chartjs/Chart.js/issues/4946

# Documentation

## Installing the plugin
TODO

## Configure the axis
```
xAxes: [{
    type: 'hierarchical-category',
	labels: [
          { label: 'USA', children: ['New York', 'San Francisco']}, 
          { label: 'Canada', children: ['Toronto', 'Vancouver']}],
}]
```
