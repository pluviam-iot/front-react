import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-materialize';

import './index.css';

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.charts = window.google.charts;
    this.charts.load('current', {
      packages: ['corechart'],
    });
    this.promiseLoad = new Promise(resolve => this.charts.setOnLoadCallback(resolve));
  }

  drawChart({
    chart,
    color,
    title,
    data,
  }) {
    const options = {
      hAxis: {
        format: 'HH:mm',
      },
      colors: color,
      legend: {
        position: 'none',
      },
      height: 400,
      backgroundColor: '#FFFFFF',
      title,
      animation: {
        duration: 1000,
        easing: 'in',
      },
      isStacked: false,
    };
    chart.draw(data, options);
  }

  createChart() {
    const { input, data } = this.props;
    const table = new window.google.visualization.DataTable();
    table.addColumn('datetime', 'Data/Hora');
    table.addColumn('number', input.shortName);
    data.forEach((weather) => {
      table.addRow([new Date(weather.date), weather[input.name]]);
    });
    const chart = new window.google.visualization[input.chartType](document.getElementById(this.containerId));
    this.drawChart({
      chart,
      color: input.chartColors,
      title: `${input.shortName} - ${input.unit}`,
      data: table,
      height: 200,
    });
  }

  render() {
    this.containerId = `container-chart-${Date.now() + Math.floor(Math.random() * 10000)}`;
    this.promiseLoad.then(() => this.createChart());
    return (
      <div id={this.containerId} />
    );
  }
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape).isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    shortName: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    chartType: PropTypes.string.isRequired,
    chartColors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
