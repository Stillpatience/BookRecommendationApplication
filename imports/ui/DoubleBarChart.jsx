import React, {Component} from 'react';
import * as d3 from "d3";
import {genresMap, getGenresFromID} from "./Books";
import {getHighestCountMap, countSimilarGenres, countGenresMap} from "../utils/utils";
import {GenresCollection} from "../api/links";

const getGenrePercentages = (book_id) => {
    const genreItems = GenresCollection.find({"id":book_id}, {}).fetch();
    const genres = [];
    genreItems.forEach(genreItem => {
            genres.push({"name":"This book: " +genreItem["genres"], "value": (1 / genreItems.length) * 100});
        }
    )
    return genres
}

const getSimilarGenres = (genresCount) => {
    let newMap = []
    let total_amount_of_genres = 0
    for (const key in genresCount) {
        if (genresCount.hasOwnProperty(key)) {
            total_amount_of_genres += genresCount[key];
        }
    }
    for (const key in genresCount) {
        let new_value = Math.floor((genresCount[key]/total_amount_of_genres) * 100)
        newMap.push({"name":"Your taste: " + key, "value": new_value})
    }
    return newMap;
}

const isIn = (genre, genresList) => {
    for (const key in genresList) {
        if (genresList.hasOwnProperty(key)) {
            const genres = genresList[key];
            if (genres["name"].split(" ")[genres["name"].split(" ").length - 1] === genre["name"].split(" ")[genre["name"].split(" ").length - 1]){
                return true
            }
        }
    }
    return false
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

const insertGenre = (merged_genres, insertGenre) => {
    let index = 0
    const merged_genres_length = merged_genres.length;
    for (let i = 0; i < merged_genres_length; i++) {
        const genre = merged_genres[i];
        const genreName = genre["name"].split(" ")[genre["name"].split(" ").length - 1]
        const insertGenreName = insertGenre["name"].split(" ")[insertGenre["name"].split(" ").length - 1]
        if (genreName === insertGenreName){
            merged_genres.insert(index+1, insertGenre);
            break;
        }
        index++;

    }
    if (merged_genres.length === 0) {
        merged_genres.push(insertGenre);
    }
}
const mergeGenres = (genres1, genres2) => {

    let merged_genres = [];
    for (let i  = 0; i < genres1.length; i++) {
        const genre = genres1[i];
        if (typeof genre !== 'undefined' && isIn(genre, genres2)){
            merged_genres.push(genres1[i])
        }
    }
    for (let i  = 0; i < genres2.length; i++) {
        const genre = genres2[i];
        if (typeof genre !== 'undefined' && isIn(genre, genres1)) {
            insertGenre(merged_genres, genres2[i])
        }
    }
    return merged_genres
}

class DoubleBarChart extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        let genresCount = countGenresMap();
        let this_book_genres = getGenrePercentages(this.props.book_id);

        const similarGenresCount = countSimilarGenres(genresCount, this.props.book_id);
        let genres = getSimilarGenres(similarGenresCount);
        if (this_book_genres.length > 0 && genres.length > 0) {
            genres = mergeGenres(genres, this_book_genres);
        }

        console.log("Final genres", genres)
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
            .attr("id", "visualization")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.select("body")
            .select("#navigation")
            .insert("p",":first-child")
            .attr("id", "visualization-paragraph")
            .text("Your taste matches the genres of this book: ");

        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, 100]);

        const y = d3.scaleBand()
            .rangeRound([height, 0])
            .padding(.1)
            .domain(genres.map(function (d) {
                return d.name;
            }));
        console.log("y", y)

        const bars = svg.selectAll(".bar")
            .data(genres)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                if (d.name.split(" ")[0] === "Your"){
                    return y(d.name);
                }else{
                    return y(d.name)+40;
                }
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
                if (d.name.split(" ")[0] === "Your") {
                    console.log(d.name)
                    console.log(y(d.name))
                    return y(d.name) + y.bandwidth() / 4 - 25;
                } else {
                    console.log(d.name)
                    console.log(y(d.name))
                    return y(d.name) + y.bandwidth() / 4 - 25 + 40;
                }
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value) - 80;
            })
            .text(function (d) {
                return parseFloat(d.value).toFixed(2) + "% match";
            });

        //add a genre label to the left of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                if (d.name.split(" ")[0] === "Your") {
                    return y(d.name) + y.bandwidth() / 4 - 25;
                } else{
                    return y(d.name) + y.bandwidth() / 4 - 25 + 40;
                }
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

export default DoubleBarChart;
