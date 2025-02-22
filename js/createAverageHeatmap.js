export function createAverageHeatmap(avgData) {
  const margin = { top: 50, right: 30, bottom: 50, left: 60 };
  const width = 800 - margin.left - margin.right;
  const heightPerDay = 500;

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
