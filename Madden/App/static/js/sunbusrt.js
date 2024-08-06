// Set up dimensions and radius
const width = 800;
const height = 600;
const radius = Math.min(width, height) / 2;

// Create an SVG container
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// Define a partition layout
const partition = d3.partition()
    .size([2 * Math.PI, radius]);

// Define a color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);

// Create a hierarchy and compute the partition
const root = d3.hierarchy(data)
    .sum(d => d.size)
    .sort((a, b) => b.size - a.size);

partition(root);

// Create arc generator
const arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1);

// Append arcs to the SVG
svg.selectAll("path")
    .data(root.descendants())
    .enter().append("path")
    .attr("d", arc)
    .style("stroke", "#fff")
    .style("fill", d => color(d.data.name))
    .append("title")
    .text(d => `${d.data.name}\nSize: ${d.value}`);