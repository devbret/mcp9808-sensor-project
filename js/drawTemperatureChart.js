export async function drawTemperatureChart() {
  const data = await d3.csv("temperature_log.csv", (d) => {
    return {
      timestamp: new Date(d.Timestamp),
      temperature: +d["Temperature (°C)"],
    };
  });

  const hourlyData = d3
    .rollups(
      data,
      (v) => d3.mean(v, (d) => d.temperature),
      (d) => d3.timeHour(d.timestamp)
    )
    .map(([hour, avgTemp]) => ({ hour, avgTemp }));

  const width = 800,
    height = 500,
    margin = { top: 40, right: 30, bottom: 80, left: 50 };

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(hourlyData, (d) => d.hour))
    .range([margin.left, width - margin.right]);

  const yScale = d3
    .scaleLinear()
    .domain([
      d3.min(hourlyData, (d) => d.avgTemp) - 1,
      d3.max(hourlyData, (d) => d.avgTemp) + 1,
    ])
    .range([height - margin.bottom, margin.top]);

  const svg = d3
    .select("#line-graph-hourly-average")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const line = d3
    .line()
    .x((d) => xScale(d.hour))
    .y((d) => yScale(d.avgTemp))
    .curve(d3.curveMonotoneX);

  svg
    .append("path")
    .datum(hourlyData)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(
      d3
        .axisBottom(xScale)
        .ticks(d3.timeHour.every(6))
        .tickFormat(d3.timeFormat("%b %d %H:%M"))
    )
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");

  svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));

  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - 10)
    .attr("text-anchor", "middle")
    .text("Time (Hour)");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Temperature (°C)");

  svg
    .append("text")
    .attr("x", 10)
    .attr("y", 30)
    .attr("text-anchor", "start")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .text("Average Hourly Temperatures");
}
