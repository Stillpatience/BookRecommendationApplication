import React, {Component} from 'react';
import * as d3 from "d3";

class VennDiagram extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const data = [12, 5, 6, 6, 9, 10];
        const w = window.innerWidth;
        const h = "10rem";
        const svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("margin-left", 100);

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", "5rem")
            .attr("cx", "47%")
            .attr("cy", "50%")
            .attr("stroke", "purple")
            .attr("fill", "none")
            .attr("stroke-width", "3")

        svg.append("circle")
            .attr("r", "5rem")
            .attr("cx", "53%")
            .attr("cy", "50%")
            .attr("stroke", "purple")
            .attr("fill", "none")
            .attr("stroke-width", "3")
    }

    render(){
        return <div></div>
    }

}

export default VennDiagram;
