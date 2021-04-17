import React, {Component} from 'react';
import * as d3 from "d3";
import {countSimilarGenres, countGenresMap} from "../utils/utils";
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
        if (genresCount.hasOwnProperty(key)) {

            let new_value = Math.floor((genresCount[key]/total_amount_of_genres) * 100)
            newMap.push({"name":"Your taste: " + key, "value": new_value})
        }
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
        const textHeight = 60
        const bottomHeight = 60
        const newHeight = textHeight + bottomHeight + 160 * Object.keys(genres).length;
        const distanceWithinBars = 60;

        const width = 0.9 * window.innerWidth,
            height = newHeight;

        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", width)
            .attr("height", height / 1.75)
            .attr("id", "double-barchart")
            .append("g")

        const x = d3.scaleLinear()
            .range([0, width])
            .domain([0, 100]);

        const barHeight = 10;

        const yBandInterval = (height - textHeight - bottomHeight) / Object.keys(genres).length;

        let yCoordinates = {};
        let currentY = 100;

        for (let i = 0; i < Object.keys(genres).length; i++) {
            if (genres[i]["name"].split(" ")[0] === "Your"){
                yCoordinates[genres[i]["name"]] = currentY
                yCoordinates[genres[i]["name"].replace("Your taste", "This book")] = currentY
                currentY += yBandInterval
            }
        }

        const bars = svg.selectAll(".bar")
            .data(genres)
            .enter()
            .append("g")

        const fo1 = svg.append("foreignObject")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", width)
            .attr("height", 300)
            .append('xhtml:div')
            .attr("text-overflow", "ellipsis")
            .attr("overflow-wrap", "anywhere")
            .attr("overflow", "hidden")


        fo1.append("p")
            .attr('x', 0)
            .attr('y', 0)
            .attr("dy", ".35em")
            .attr("font-size", "1em")
            .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
            .text("Your taste matches the genres of this book: ")

        //Append ghost rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", d => {
                if (d.name.split(" ")[0] === "Your"){
                    return yCoordinates[d.name];
                }else{
                    return yCoordinates[d.name] + distanceWithinBars;
                }
            })
            .attr("height", barHeight)
            .attr("x", 0)
            .attr("width", width)
            .attr("style", "fill:rgb(117, 33, 240);stroke-width:3;")
            .style("opacity", 0.2);

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                if (d.name.split(" ")[0] === "Your"){
                    return yCoordinates[d.name];
                }else{
                    return yCoordinates[d.name] + distanceWithinBars;
                }
            })
            .attr("height", barHeight)
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
                    return yCoordinates[d.name] + distanceWithinBars / 2;
                } else {
                    return yCoordinates[d.name] + distanceWithinBars * 1.5;
                }
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value);
            })
            .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
            .attr("text-anchor", d =>
            {
                if (d.value > 50){
                    return "end"
                } else {
                    return "start"
                }
            })
            .text(function (d) {
                return parseFloat(d.value).toFixed(0) + "% match";
            });

        //add a genre label to the left of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                if (d.name.split(" ")[0] === "Your") {
                    return yCoordinates[d.name] - 10;
                } else{
                    return yCoordinates[d.name] + distanceWithinBars - 10;
                }
            })
            .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
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
