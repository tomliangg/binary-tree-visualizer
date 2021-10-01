import * as d3 from "d3";
import { buildTree, decode, isLongText } from "./util";
import "./style.css";

document.querySelector("#updateBtn").addEventListener("click", e => {
  e.preventDefault();
  try {
    const inputString = document.querySelector("#inputString").value;
    const data = buildTree(decode(inputString));
    
    const w = document.querySelector("svg").clientWidth;
    const h = document.querySelector("svg").clientHeight - 100;
    const treeLayout = d3.tree().size([w, h]);
    
    const root = d3.hierarchy(data);
    treeLayout(root);

    // clean up
    d3.selectAll("circle").remove();
    d3.selectAll("line").remove();
    d3.selectAll("text").remove();
    document.querySelector("#errorText").textContent = "";

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
      .classed("label", function(d) {
        return !isLongText(d.data.name);
      })
      .classed("longLabel", function(d) {
        return isLongText(d.data.name);
      })
      .attr("text-anchor", "middle")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .attr("dy", "5px")
      .text(function (d) {
        const name = d.data.name;
        return isLongText(name) ? name.slice(0, 3) + "..." : name;
      });
  } catch (e) {
    document.querySelector("#errorText").textContent = e.message;
  }
});