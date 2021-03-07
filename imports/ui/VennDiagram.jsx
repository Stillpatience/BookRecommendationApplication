import React, {Component} from 'react';
import * as d3 from "d3";

class VennDiagram extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const data = [12, 5, 6, 6, 9, 10];
        const w = window.innerWidth;
        const h = "20rem";
        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", w)
            .attr("height", h)
            .attr("id", "venn_diagram")
            .style("margin-left", 100);

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", "10rem")
            .attr("cx", "47%")
            .attr("cy", "50%")
            .attr("stroke", "purple")
            .attr("fill", "none")
            .attr("stroke-width", "3")

        svg.append("circle")
            .attr("r", "10rem")
            .attr("cx", "57%")
            .attr("cy", "50%")
            .attr("stroke", "purple")
            .attr("fill", "none")
            .attr("stroke-width", "3")

        const recommendedGenres = ["GenreA", "GenreB", "GenreC"];
        let x = 57
        let y = 10
        recommendedGenres.forEach(text =>
            {
                svg.append("text")
                .attr("x", x.toString() + "%")
                .attr("y", y.toString() + "%")
                .attr("dy", ".35em")
                .text(text);
                y += 10;
            }
        );

        const myGenres = ["Genre1", "Genre2", "Genre3"]
        x = 43
        y = 10
        myGenres.forEach(text =>
            {
                svg.append("text")
                    .attr("x", x.toString() + "%")
                    .attr("y", y.toString() + "%")
                    .attr("dy", ".35em")
                    .text(text);
                y += 10;
            }
        );

        const overlap = ["Genre1A", "Genre2B", "Genre3C"]
        x = 50
        y = 20
        overlap.forEach(text =>
            {
                svg.append("text")
                    .attr("x", x.toString() + "%")
                    .attr("y", y.toString() + "%")
                    .attr("dy", ".35em")
                    .text(text);
                y += 10;
            }
        );
    }

    render(){
        return <div></div>
    }

}

export default VennDiagram;
