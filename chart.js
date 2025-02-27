document.addEventListener("DOMContentLoaded", function () {
  const width = 800;
  const height = 600;
  const radius = Math.min(width, height) / 4;

  // Data source: using skillsData from config.js
  const data = window.skillsData;

  // DOM elements
  const svgElement = document.getElementById("chart-svg");
  const tooltipElement = document.getElementById("tooltip");
  const progressEl = document.getElementById("progress-score");
  if (!svgElement || !tooltipElement) return;

  // Set up the SVG container with a centered viewBox
  const svg = d3
    .select(svgElement)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
    .append("g");

  // Create a hierarchical structure and compute the partition layout
  const root = d3.hierarchy(data).sum((d) => (d.children ? 0 : 1));
  const partition = d3.partition().size([2 * Math.PI, radius]);
  partition(root);

  // Radii based on node depth
  root.each((d) => {
    if (d.depth === 0) {
      d.y0 = 0;
      d.y1 = radius * 0.34;
    } else if (d.depth === root.height) {
      d.y0 = radius * 0.68;
      d.y1 = radius * 0.68;
    } else {
      const rangePerLevel = (0.68 - 0.34 - 0.008) / (root.height - 1);
      d.y0 = radius * (0.34 + (d.depth - 1) * rangePerLevel);
      d.y1 = radius * (0.34 + d.depth * rangePerLevel);
    }
  });

  const innerRadius = radius * 0.68;
  const outerRadius = radius * 1.8;

  // Create gradient definitions for each leaf node
  const defs = svg.append("defs");
  root.leaves().forEach((d) => {
    const angle = (d.x0 + d.x1) / 2;
    const x1 = innerRadius * Math.cos(angle - Math.PI / 2);
    const y1 = innerRadius * Math.sin(angle - Math.PI / 2);
    const x2 = outerRadius * Math.cos(angle - Math.PI / 2);
    const y2 = outerRadius * Math.sin(angle - Math.PI / 2);

    const gradient = defs
      .append("linearGradient")
      .attr("id", `green-gradient-${d.data.id}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x2)
      .attr("y2", y2);

    const nodeData = d.data;
    const [colorA, colorB] =
      nodeData.value === nodeData.expected
        ? ["#54C784", "#54C784"]
        : ["#1FB75E", "#1FB75E"];

    gradient.append("stop").attr("offset", "0%").attr("stop-color", colorA);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", colorB);
  });

  // Create an arc generator for the chart slices
  const arc = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .padAngle(0.006)
    .padRadius(radius / 3)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1);

  // Draw slices for the sunburst
  const slices = svg
    .selectAll("path")
    .data(root.descendants())
    .enter()
    .append("path")
    .attr("class", "slice")
    .attr("d", (d) => arc(d))
    .style("fill", (d) =>
      d.ancestors().length > 1 ? window.getSliceColor(d) : "#ffffff"
    )
    .style("opacity", (d) => window.getHierarchyOpacity(d.depth))
    .style("stroke", "#fff")
    .style("stroke-width", "1px");

  // Scale for mapping value levels to radial distances
  const radialScale = d3
    .scaleLinear()
    .domain([0, 100])
    .range([innerRadius, outerRadius]);

  // Create background circles for reference
  svg
    .selectAll(".background-circle")
    .data([20, 40, 60, 80, 100])
    .enter()
    .append("circle")
    .attr("class", "background-circle")
    .attr("r", (d) => radialScale(d))
    .style("fill", "none")
    .style("stroke", "#c6c6c6")
    .style("stroke-width", "1px")
    .style("opacity", 0.3);

  // Draw background bars for each leaf node
  svg
    .selectAll(".background-bar")
    .data(root.leaves())
    .enter()
    .append("path")
    .attr("class", "slice background-bar")
    .attr("d", (d) => {
      const arcGen = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(() => radialScale(Math.max(d.data.expected, d.data.value)))
        .startAngle(d.x0)
        .endAngle(d.x1)
        .padAngle(0.025)
        .padRadius(innerRadius);
      return arcGen(d);
    })
    .style("fill", "#EFEFEF")
    .style("opacity", 1);

  // Draw the skill bars (actual values)
  const bars = svg
    .selectAll(".skill-bar")
    .data(root.leaves())
    .enter()
    .append("path")
    .attr("class", "slice skill-bar")
    .attr("d", (d) => {
      const arcGen = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(() => radialScale(d.data.value))
        .startAngle(d.x0)
        .endAngle(d.x1)
        .padAngle(0.025)
        .padRadius(innerRadius);
      return arcGen(d);
    })
    .style("fill", (d) => {
      const nodeData = d.data;
      return nodeData.value >= nodeData.expected
        ? `url(#green-gradient-${nodeData.id})`
        : nodeData.value * 2 < nodeData.expected
        ? window.SkillColors.Red
        : window.SkillColors.Yellow;
    })
    .style("opacity", 1);

  // Create a group for markers (expected value indicators)
  const markersGroup = svg.append("g").attr("class", "markers-layer");
  const valueMarkerGroups = markersGroup
    .selectAll(".value-marker-group")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("class", "value-marker-group");

  valueMarkerGroups
    .append("circle")
    .attr("class", "value-marker expected")
    .attr("transform", (d) => {
      const angle = (d.x0 + d.x1) / 2 - Math.PI / 2;
      const r = radialScale(d.data.expected);
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      return `translate(${x},${y})`;
    })
    .attr("r", 4)
    .style("fill", "#656565")
    .style("stroke", "white")
    .style("stroke-width", "1.9px");

  // Helper to compute transform origin for scaling effects
  const getTransformOriginCoords = (d) => {
    const angle = (d.x0 + d.x1) / 2;
    const originX = Math.cos(angle - Math.PI / 2) * innerRadius;
    const originY = Math.sin(angle - Math.PI / 2) * innerRadius;
    return `${originX}px ${originY}px`;
  };

  // Event handlers
  function handleMouseOver(event, d) {
    if (d.depth === root.height) {
      // Leaf node hover: scale up the skill bar
      svg
        .selectAll(".slice.skill-bar")
        .filter((node) => node === d)
        .attr("transform", "scale(1.04)")
        .attr("transform-origin", getTransformOriginCoords(d));
    }
    if (d.depth !== root.height && d.depth !== 0) {
      // For intermediate nodes: dim other slices and highlight descendants
      svg
        .selectAll(".slice:not(.background-bar):not(.skill-bar)")
        .filter((node) => node !== d && node.depth !== 0)
        .style("opacity", 1)
        .style("fill", window.SkillColors.Gray)
        .each(function (hierarchyNode) {
          const leafNodes = hierarchyNode
            .descendants()
            .filter((child) => child.depth === root.height);
          leafNodes.forEach((leaf) => {
            svg
              .selectAll(".slice.skill-bar")
              .filter((node) => node === leaf)
              .style("opacity", 1)
              .style("fill", window.SkillColors.Gray);
          });
        });
      svg
        .selectAll(".slice:not(.background-bar):not(.skill-bar)")
        .filter((node) => node === d)
        .style("opacity", 0.85)
        .each(function (parentNode) {
          const leafNodes = parentNode
            .descendants()
            .filter((child) => child.depth === root.height);
          leafNodes.forEach((leaf) => {
            svg
              .selectAll(".slice.skill-bar")
              .filter((node) => node === leaf)
              .attr("transform", "scale(1.04)")
              .attr("transform-origin", getTransformOriginCoords(leaf))
              .style("fill", (d) => {
                const nodeData = d.data;
                return nodeData.value >= nodeData.expected
                  ? `url(#green-gradient-${nodeData.id})`
                  : nodeData.value * 2 < nodeData.expected
                  ? window.SkillColors.Red
                  : window.SkillColors.Yellow;
              })
              .style("opacity", 1);
          });
        });
    }

    // Show tooltip with data details
    d3.select("#tooltip")
      .style("display", "block")
      .html(
        `<strong>${d.data.name}</strong>
           ${d.data.value ? "<br>Current: " + d.data.value : ""}
           ${d.data.expected ? "<br>Expected: " + d.data.expected : ""}`
      )
      .style("left", event.pageX + 10 + "px")
      .style("top", event.pageY - 25 + "px");
  }

  function handleMouseOut() {
    // Reset slice styles
    svg
      .selectAll(".slice:not(.background-bar)")
      .style("opacity", (d) => window.getHierarchyOpacity(d.depth))
      .style("stroke-width", "1.5px")
      .attr("transform", "scale(1)")
      .style("fill", (d) =>
        d.ancestors().length > 1 ? window.getSliceColor(d) : "#ffffff"
      );
    svg.selectAll(".slice.skill-bar").style("fill", (d) => {
      const nodeData = d.data;
      return nodeData.value >= nodeData.expected
        ? `url(#green-gradient-${nodeData.id})`
        : nodeData.value * 2 < nodeData.expected
        ? window.SkillColors.Red
        : window.SkillColors.Yellow;
    });
    d3.select("#tooltip").style("display", "none");
  }

  // Attach event listeners
  slices.on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
  bars
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleClick);
  valueMarkerGroups
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  svg
    .append("defs")
    .selectAll("path")
    .data(root.leaves())
    .enter()
    .append("path")
    .attr("id", (d, i) => `skillPath${i}`)
    .attr("d", (d) => {
      const angle = (d.x0 + d.x1) / 2 - Math.PI / 2;
      const r = innerRadius + 15;
      const startX = r * Math.cos(angle);
      const startY = r * Math.sin(angle);
      return `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${-startX} ${-startY}`;
    });
});
