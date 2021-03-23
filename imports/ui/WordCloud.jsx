import React, {Component} from 'react';
import * as d3 from "d3";

import VennDiagram from "./VennDiagram";
class WordCloud extends Component {
    componentDidMount() {
        this.drawChart();
    }
    drawChart() {
        // List of words
        const myWords = ["Hello", "Everybody", "How", "Are", "You", "Today", "It", "Is", "A", "Lovely", "Day", "I", "Love", "Coding", "In", "My", "Van", "Mate", "Peace", "Love", "Keep", "The", "Good", "Work", "Make", "Love", "Not", "War", "Surfing", "R", "R",
            "Data-Viz", "Python", "Linux", "Programming", "Graph Gallery", "Biologie", "Resistance",
            "Computing", "Data-Science", "Reproductible", "GitHub", "Script", "Experimentation", "Talk", "Conference", "Writing",
            "Publication", "Analysis", "Bioinformatics", "Science", "Statistics", "Data",
            "Programming", "Wheat", "Virus", "Genotyping", "Work", "Fun", "Surfing", "R", "R",
            "Data-Viz", "Python", "Linux", "Programming"]

        // set the dimensions and margins of the graph
        const margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = 450 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#my_dataviz").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

        // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
        // Wordcloud features that are different from one word to the other must be here
        var layout = d3.wordcloud()
                .size([width, height])
                .words(myWords.map(function (d) {
                    return {text: d};
                }))
                .padding(5)        //space between words
                .rotate(-45)       // rotation angle in degrees
                .fontSize(20)      // font size of words
                .on("end", draw);
        layout.start();

        // This function takes the output of 'layout' above and draw the words
        // Wordcloud features that are THE SAME from one word to the other can be here
        function draw(words) {
            svg
                .append("g")
                .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", 20)
                .style("fill", "#69b3a2")
                .attr("text-anchor", "middle")
                .style("font-family", "Impact")
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function (d) {
                    return d.text;
                });
        }
    }

    render(){
        return <div></div>
    }

}

export default WordCloud;
