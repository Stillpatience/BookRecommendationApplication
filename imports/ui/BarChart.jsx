import React, {Component} from 'react';
import * as d3 from "d3";
import {genresMap, getGenresFromID} from "./Books";
import {getHighestCountMap, countSimilarGenres, countGenresMap} from "../utils/utils";
import {GenresCollection} from "../api/links";


const countGenres = (genres) => {
}


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

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        const margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };
        const newHeight = 100 * Object.keys(genres).length;

        const width = 0.8 * window.innerWidth - margin.left - margin.right,
            height = newHeight - margin.top - margin.bottom;

        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "barchart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, 100]);

        const y = d3.scaleBand()
            .rangeRound([height, 0])
            .padding(.1)
            .domain(genres.map(function (d) {
                return d.name;
            }));

        const bars = svg.selectAll(".bar")
            .data(genres)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name) + 20;
            })
            .attr("height", y.bandwidth() / 8)
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            })
            .attr("style", "fill:rgb(117, 33, 240);stroke-width:3;");

        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", 0)
            //x position is 3 pixels to the right of the bar
            .attr("x", 0)
            .text("This book matches your interests in following genres: ");

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.bandwidth() / 4 - 5;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value) - 80;
            })
            .text(function (d) {
                return d.value + "% match";
            });

        //add a genre label to the left of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.bandwidth() / 4 - 5;
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
