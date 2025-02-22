import { createHeatmaps } from "./createHeatmaps.js";
import { createAverageHeatmap } from "./createAverageHeatmap.js";
import { drawTemperatureChart } from "./drawTemperatureChart.js";

d3.csv("temperature_log.csv", d3.autoType).then((data) => {
  data.forEach((d) => {
    d.Timestamp = new Date(d.Timestamp);

    const year = d.Timestamp.getFullYear();
    const month = String(d.Timestamp.getMonth() + 1).padStart(2, "0");
    const day = String(d.Timestamp.getDate()).padStart(2, "0");

    d.Date = `${year}-${month}-${day}`;
  });

  const groupedData = d3.group(data, (d) => d.Date);
  const uniqueDates = Array.from(groupedData.keys());

  createHeatmaps(groupedData, uniqueDates);

  const groupedByTime = d3.rollup(
    data,
    (v) => d3.mean(v, (d) => d["Temperature (°C)"]),
    (d) => d.Timestamp.getHours(),
    (d) => d.Timestamp.getMinutes()
  );

  const avgData = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute++) {
      let avgTemp = null;
      if (groupedByTime.has(hour) && groupedByTime.get(hour).has(minute)) {
        avgTemp = groupedByTime.get(hour).get(minute);
      }
      avgData.push({ hour, minute, avgTemp });
    }
  }

  createAverageHeatmap(avgData);
  drawTemperatureChart();
});
