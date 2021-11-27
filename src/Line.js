import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

import { mockData } from "./constant";

function App() {
  const [datasets, setDataSet] = useState([]);
  const [labels, setlabels] = useState([]);

  useEffect(() => {
    let label = [];
    const newdata = mockData.map((mapData, index) => {
      let dataSet = {};
      dataSet.fill = false;
      dataSet.borderColor = "#" + ((1<<24)*Math.random() | 0).toString(16);
      dataSet.label = mapData._id;
      dataSet.data = mapData.sensorReadings.map((data) => {
        if (index === 0) {
          label.push(moment(new Date(data.timestamp)).format("YYYY-MM-DD"));
        }
        return data.value;
      });
      return dataSet
    });
    setlabels(label);
    setDataSet(newdata);
  }, []);

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 100, 0);
    return {
      backgroundColor: gradient,
      labels,
      datasets,
    };
  };
  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default App;
