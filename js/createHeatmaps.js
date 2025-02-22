export function createHeatmaps(groupedData, uniqueDates) {
  const margin = { top: 50, right: 30, bottom: 50, left: 60 };
  const width = 800 - margin.left - margin.right;
  const heightPerDay = 500;

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
