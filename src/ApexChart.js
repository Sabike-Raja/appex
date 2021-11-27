import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";

import { mockData } from "./constant";

function App() {
  let seriesData = [];

  for (let i = 0; i < mockData.length; i++) {
    const coordinates = [];
    let reading;
    for (reading of mockData[i].sensorReadings) {
      coordinates.push([reading.timestamp, reading.value]);
    }
    let data = {
      name: `sensorReadings ${i + 1}`,
      data: coordinates,
    };
    seriesData.push(data);
  }
  const series = seriesData;
  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 650,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
      events: {
        beforeZoom: function (chartContext, { xaxis }) {
          alert(
            `${moment(new Date(xaxis.min)).format("MMM-DD-YY")} - ${moment(
              new Date(xaxis.max)
            ).format("MMM-DD-YYYY")}`
          );
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Stock Price Movement",
      align: "left",
    },
    // fill: {
    //   type: "gradient",
    //   gradient: {
    //     shadeIntensity: 1,
    //     inverseColors: false,
    //     opacityFrom: 0.5,
    //     opacityTo: 0,
    //     stops: [0, 90, 100],
    //   },
    // },
    yaxis: {
      labels: {
        formatter: function (val) {
          // return (val / 1000000).toFixed(0);
          return val;
        },
      },
      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd/MM/yy",
      },
    },
    // xaxis: {
    //   labels: {
    //     style: {
    //       colors: [],
    //       fontSize: "12px",
    //       fontFamily: "Helvetica, Arial, sans-serif",
    //       fontWeight: 400,
    //       cssClass: "apexcharts-xaxis-label",
    //       padding: 10
    //     },
    //     formatter: function (val) {
    //       return moment(new Date(val)).format("MM-DD-YY");
    //       // return val
    //     },
    //   },
    //   // type: "datetime",
    //   // labels: {
    //   //   datetimeFormatter: {
    //   //     year: "yyyy",
    //   //     month: "MMM 'yy",
    //   //     day: "dd MMM",
    //   //     hour: "HH:mm",
    //   //   },
    //   // },
    //   type: "date",
    // },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          // return (val / 1000000).toFixed(0);
          return val;
        },
      },
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={650} />
    </div>
  );
}

export default App;
