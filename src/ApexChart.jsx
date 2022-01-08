import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import ApexCharts from "apexcharts";

import { mockData } from "./constant";

function App() {
  let seriesData = [];

  const [dataList, setDataList] = useState([]);
  const [currentData, setCurrentData] = useState([]);

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
      id: "assetDistribution",
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
    legend: {
      show: false,
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

  useEffect(() => {
    if (series.length && dataList.length === 0) {
      const tempData = series.map((mapData) => mapData.name);
      setDataList(tempData);
      const slicedArray = tempData.slice(0, 2);
      tempData.forEach((mapData) => {
        if (!slicedArray.includes(mapData)) {
          ApexCharts.exec("assetDistribution", "hideSeries", mapData);
        }
      });
      setCurrentData(slicedArray);
    }
  }, [series]);

  const onClickChartName = (clickedItem) => {
    if (currentData.includes(clickedItem)) {
      let tempData = [...currentData];
      tempData = tempData.filter((filterData) => filterData != clickedItem);
      for (const name of dataList) {
        if (!currentData.includes(name)) {
          tempData.push(name);
          ApexCharts.exec("assetDistribution", "showSeries", name);
          break;
        }
      }
      ApexCharts.exec("assetDistribution", "hideSeries", clickedItem);
      setCurrentData(tempData);
    } else {
      let tempData = [...currentData];
      if (tempData.length) {
        ApexCharts.exec("assetDistribution", "hideSeries", tempData[0]);
        ApexCharts.exec("assetDistribution", "showSeries", clickedItem);
        tempData.shift();
        tempData.push(clickedItem);
        setCurrentData(tempData);
      }
    }
  };

  return (
    <div id="chat-id">
      <Chart options={options} series={series} type="line" height={650} />
      <div style={{ textAlign: "center", fontSize: "13px", color: "#706c6c" }}>
        {series.map((mapData) => (
          <span
            onClick={() => onClickChartName(mapData.name)}
            key={mapData.name}
          >
            <span
              style={{
                height: "10px",
                width: "10px",
                backgroundColor: currentData.includes(mapData.name)
                  ? "rgb(57 131 72)"
                  : "#bbb",
                borderRadius: "50%",
                display: "inline-block",
              }}
            ></span>
            <span
              style={{
                cursor: "pointer",
                marginLeft: "4px",
                marginRight: "4px",
              }}
            >
              {mapData.name}
            </span>
          </span>
        ))}
      </div>
      <button
        onClick={() => {
          ApexCharts.exec(
            "assetDistribution",
            "hideSeries",
            "sensorReadings 1"
          );
        }}
      >
        Hide
      </button>
    </div>
  );
}

export default App;
