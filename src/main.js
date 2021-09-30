import * as d3 from "d3";
import { buildTree } from "./util";
import "./style.css";

const data = buildTree([1, null, 3]);
const treeLayout = d3.tree().size([400, 200]);
const root = d3.hierarchy(data);
treeLayout(root);

// Nodes
d3.select("svg g.nodes")
  .selectAll("circle.node")
  .data(root.descendants())
  .enter()
  .append("circle")
  .classed("node", function (d) {
    return d.data.name !== null;
  })
  .classed("hidden", function (d) {
    return d.data.name === null;
  })
  .attr("cx", function (d) {
    return d.x;
  })
  .attr("cy", function (d) {
    return d.y;
  })
  .attr("r", 20);

// Links
d3.select("svg g.links")
  .selectAll("line.link")
  .data(root.links())
  .enter()
  .append("line")
  .classed("link", function (d) {
    return d.target.data.name !== null;
  })
  .classed("hidden", function (d) {
    return d.target.data.name === null;
  })
  .attr("x1", function (d) {
    return d.source.x;
  })
  .attr("y1", function (d) {
    return d.source.y;
  })
  .attr("x2", function (d) {
    return d.target.x;
  })
  .attr("y2", function (d) {
    return d.target.y;
  });

// Labels
d3.select("svg g.labels")
  .selectAll("text.label")
  .data(root.descendants())
  .enter()
  .append("text")
  .classed("label", true)
  .attr("text-anchor", "middle")
  .attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
  })
  .attr("dy", "5px")
  .text(function (d) {
    return d.data.name;
  });
