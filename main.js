const margin = { top: 50, right: 30, bottom: 50, left: 60 };
const width = 800 - margin.left - margin.right;
const heightPerDay = 500;

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
});

function createHeatmaps(groupedData, uniqueDates) {
  const totalHeight =
    uniqueDates.length * (heightPerDay + margin.top + margin.bottom);

  const svg = d3
    .select("#heatmap")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", totalHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand().domain(d3.range(24)).range([0, width]).padding(0.1);

  uniqueDates.forEach((date, index) => {
    const dailyData = groupedData.get(date);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const y = d3
      .scaleBand()
      .domain(minutes)
      .range([heightPerDay, 0])
      .padding(0.1);

    const color = d3
      .scaleSequential(d3.interpolateCool)
      .domain([
        d3.min(dailyData, (d) => d["Temperature (°C)"]),
        d3.max(dailyData, (d) => d["Temperature (°C)"]),
      ]);

    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(0, ${index * (heightPerDay + margin.top)})`
      );

    g.append("text")
      .attr("x", -50)
      .attr("y", -10)
      .attr("text-anchor", "start")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(date);

    g.append("g")
      .attr("transform", `translate(0, ${heightPerDay})`)
      .call(d3.axisBottom(x).tickFormat((d) => `${d}:00`));

    g.append("g").call(
      d3.axisLeft(y).tickFormat((d) => `:${d < 10 ? "0" + d : d}`)
    );

    g.selectAll("rect")
      .data(dailyData)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.Timestamp.getHours()))
      .attr("y", (d) => y(d.Timestamp.getMinutes()))
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .attr("fill", (d) => color(d["Temperature (°C)"]));
  });
}

function createAverageHeatmap(avgData) {
  const svgAvg = d3
    .select("#heatmap-average")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", heightPerDay + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xAvg = d3
    .scaleBand()
    .domain(d3.range(24))
    .range([0, width])
    .padding(0.1);

  const yAvg = d3
    .scaleBand()
    .domain(d3.range(60))
    .range([heightPerDay, 0])
    .padding(0.1);

  svgAvg
    .append("g")
    .attr("transform", `translate(0, ${heightPerDay})`)
    .call(d3.axisBottom(xAvg).tickFormat((d) => `${d}:00`));

  svgAvg
    .append("g")
    .call(d3.axisLeft(yAvg).tickFormat((d) => `:${d < 10 ? "0" + d : d}`));

  svgAvg
    .append("text")
    .attr("x", -50)
    .attr("y", -10)
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Average Daily Temperatures");

  const validTemps = avgData
    .filter((d) => d.avgTemp !== null)
    .map((d) => d.avgTemp);

  const colorAvg = d3
    .scaleSequential(d3.interpolateCool)
    .domain([d3.min(validTemps), d3.max(validTemps)]);

  svgAvg
    .selectAll("rect")
    .data(avgData)
    .enter()
    .append("rect")
    .attr("x", (d) => xAvg(d.hour))
    .attr("y", (d) => yAvg(d.minute))
    .attr("width", xAvg.bandwidth())
    .attr("height", yAvg.bandwidth())
    .attr("fill", (d) => (d.avgTemp !== null ? colorAvg(d.avgTemp) : "#ccc"));
}
