import React, {Component} from 'react';
import * as d3 from "d3";
import {genresMap} from "./Books";
import {getHighestCountMap} from "../utils/utils";


class BarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        let genresCount = {}
        for (const key in genresMap) {
            // check if the property/key is defined in the object itself, not in parent
            if (genresMap.hasOwnProperty(key)) {
                const genres = genresMap[key];
                genres.forEach(genre => {
                    if (Object.keys(genresCount).includes(genre)){
                        genresCount[genre] = genresCount[genre] + 1
                    }
                    else{
                        genresCount[genre] = 1
                    }
                })
            }
        }
        let genres = getHighestCountMap(genresCount);
        /*let genres = [{
                "name": "Genre1",
                "value": 99,
            },
            {
                "name": "Genre2",
                "value": 98,
            },
            {
                "name": "Genre3",
                "value": 80,
            },
            {
                "name": "Genre4",
                "value": 55,
            },
            {
                "name": "Genre5",
                "value": 53,
            },
            ];*/

        //sort bars based on value
        genres = genres.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        })

        genres = genres.filter(function(value){
            return value["value"] >= 50;
        });

        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        const margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };
        const newHeight = 100 * Object.keys(genres).length;

        const width = window.innerWidth - margin.left - margin.right,
            height = newHeight - margin.top - margin.bottom;

        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "visualization")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.select("body")
            .select("#navigation")
            .insert("p",":first-child")
            .attr("id", "visualization-paragraph")
            .text("This book matches your interests in following genres: ");

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
                return y(d.name);
            })
            .attr("height", y.bandwidth() / 8)
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            })
            .attr("style", "fill:rgb(117, 33, 240);stroke-width:3;");

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.bandwidth() / 4 - 25;
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
                return y(d.name) + y.bandwidth() / 4 - 25;
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