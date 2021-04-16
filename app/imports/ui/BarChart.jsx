import React, {Component} from 'react';
import * as d3 from "d3";
import {getHighestCountMap, countSimilarGenres, countGenresMap} from "../utils/utils";

class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {



        let genresCount = countGenresMap();

        const similarGenresCount = countSimilarGenres(genresCount, this.props.book_id);

        let genres = getHighestCountMap(similarGenresCount);

        //sort bars based on value
        genres = genres.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        })

        const textHeight = 60
        const newHeight = textHeight + 80 * Object.keys(genres).length;
        const width = 0.9 * window.innerWidth,
            height = newHeight;

        let y_coord = 20;

        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "barchart")

        svg.append("foreignObject")
            .attr("x", 0)
            .attr("y", y_coord)
            .attr("width", width)
            .attr("height", textHeight)
            .append('xhtml:div')
            .append('p')
            .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
            .html("This book matches your interests in following genres: ")

        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, 100]);

        const y = d3.scaleBand()
            .rangeRound([height, 0])
            .padding(.1)
            .domain(genres.map(function (d) {
                return d.name;
            }));

        const yBandInterval = (height - textHeight)/ Object.keys(genres).length;
        let yCoordinates = {};
        let currentY = 100;

        for (let i = 0; i < Object.keys(genres).length; i++) {
            yCoordinates[genres[i]["name"]] = currentY
            currentY += yBandInterval
        }

        const bars = svg.selectAll(".bar")
            .data(genres)
            .enter()
            .append("g")

        //Append ghost rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", d => yCoordinates[d.name])
            .attr("height", y.bandwidth() / 8)
            .attr("x", 0)
            .attr("width", width)
            .attr("style", "fill:rgb(117, 33, 240);stroke-width:3;")
            .style("opacity", 0.2);

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return yCoordinates[d.name];
            })
            .attr("height", y.bandwidth() / 8)
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            })
            .attr("style", "fill:rgb(117, 33, 240);stroke-width:3;");

        //add a value label to the right of each bar
        bars.append("text")
            .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return yCoordinates[d.name] + y.bandwidth() / 3;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value);
            })
            .attr("text-anchor", "end")
            .text(function (d) {
                return d.value + "% match";
            });

        //add a genre label to the left of each bar
        bars.append("text")
            .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return yCoordinates[d.name] - 10;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", 0)
            .text(function (d) {
                return d.name;
            });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;
