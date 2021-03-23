import React, {Component} from 'react';
import * as d3 from "d3";
import {countGenresMap} from "../utils/utils";
import {GenresCollection} from "../api/links";

const getHighestInterest = (ellipses) => {
    let highestInterestAmount = 0
    ellipses.forEach(ellipse => {
            if (ellipse["interest"] > highestInterestAmount) {
                highestInterestAmount = ellipse["interest"]
            }
        }
    )
    return highestInterestAmount
}

const getHighestRecommendation = (ellipses) => {
    let highestRecommendationAmount = 0
    ellipses.forEach(ellipse => {
            if (ellipse["recommendation"] > highestRecommendationAmount) {
                highestRecommendationAmount = ellipse["recommendation"]
            }
        }
    )
    return highestRecommendationAmount
}

function isIn(genreName, genresList) {
    let found = false;
    genresList.forEach(genre => {
        if (genre["genres"] === genreName){
            found = true;
        }
    })
    return found
}

const getGenreScores = (genres_in_book, genres_count) => {
    let total_score = 0
    let total_genres = 0
    for (const genre in genres_count) {
        if (genres_count.hasOwnProperty(genre)) {
            if (isIn(genre, genres_in_book)) {
                total_score = total_score + genres_count[genre];
                total_genres = total_genres + 1;
            }
        }
    }
    let genreScores = []
    for (const genre in genres_count) {
        if (genres_count.hasOwnProperty(genre)) {
            if (isIn(genre, genres_in_book)){
                genreScores.push({"name": genre,
                    "interest": (genres_count[genre] / total_score) * 100,
                    "recommendation": (1/total_genres) * 100});
            }
        }
    }
    return genreScores;
}
class ArrowsExplanation extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        const margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 60
        };
        const newHeight = 1000;

        const width = 0.8 * window.innerWidth - margin.left - margin.right,
            height = newHeight - margin.top - margin.bottom;

        const center = (0.8 * window.innerWidth - margin.left - margin.right) / 2
        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "visualization")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        let cy = 25;
        let ellipses = []
        const genresCount = countGenresMap();
        const genres_in_book = GenresCollection.find({"id":this.props.book_id}, {}).fetch();

        let genreScores = getGenreScores(genres_in_book, genresCount);
        genreScores.forEach( genreScore =>
            {
                ellipses.push({
                    "cx": center,
                    "cy": cy,
                    "rx": 100,
                    "ry": 20,
                    "text": genreScore["name"],
                    "interest": genreScore["interest"],
                    "recommendation": genreScore["recommendation"],
                });
                cy = cy + 50;
            }
        )

        const highestInterest = getHighestInterest(ellipses);


        const highestRecommendation = getHighestRecommendation(ellipses)

        const svgEllipses = svg
            .selectAll("ellipse")
            .data(ellipses)
            .enter()
            .append("g");


        const left_ellipse_y = ((ellipses.length - 1)/2)*50 + 25
        const left_ellipse_x = center - 300
        const left_ellipse_rx = 100
        svgEllipses.append("ellipse")
            .attr("cx", left_ellipse_x)
            .attr("cy", left_ellipse_y)
            .attr("rx", left_ellipse_rx)
            .attr("ry", (d,i) => { return d.ry; })
            .attr("style", "fill:none;stroke:black")

        svgEllipses.append("text")
            .attr("class", "label")
            .attr("y", left_ellipse_y)
            .attr("x", left_ellipse_x)
            .text("Your interests");

        const right_ellipse_y = ((ellipses.length - 1)/2)*50 + 25
        const right_ellipse_x = center + 300
        const right_ellipse_rx = 100

        svgEllipses.append("ellipse")
            .attr("cx", right_ellipse_x)
            .attr("cy", right_ellipse_y)
            .attr("rx", right_ellipse_rx)
            .attr("ry", (d,i) => { return d.ry; })
            .attr("style", "fill:none;stroke:black")


        svgEllipses.append("text")
            .attr("class", "label")
            .attr("y", right_ellipse_y)
            .attr("x", right_ellipse_x)
            .text("This book");

        svgEllipses.append("ellipse")
            .attr("cx", (d,i) => { return d.cx; })
            .attr("cy", (d,i) => { return d.cy; })
            .attr("rx", (d,i) => { return d.rx; })
            .attr("ry", (d,i) => { return d.ry; })
            .attr("style", "fill:none;stroke:black")

        ellipses.forEach(ellipse => {
                const stroke_width = ellipse["interest"] / highestInterest * 5;
                svgEllipses.append("line")
                    .attr("class", "line")
                    .attr("x1", left_ellipse_x + left_ellipse_rx)
                    .attr("y1", left_ellipse_y)
                    .attr("x2", ellipse["cx"] - ellipse["rx"])
                    .attr("y2", ellipse["cy"])
                    .attr("style", "stroke:rgb(0,0,0);stroke-width:"+stroke_width);
            }
        )

        ellipses.forEach(ellipse => {
                const stroke_width = ellipse["recommendation"] / highestRecommendation * 5;
                svgEllipses.append("line")
                    .attr("class", "line")
                    .attr("x1", right_ellipse_x - right_ellipse_rx)
                    .attr("y1", right_ellipse_y)
                    .attr("x2", ellipse["cx"] + ellipse["rx"])
                    .attr("y2", ellipse["cy"])
                    .attr("style", "stroke:rgb(0,0,0);stroke-width:"+stroke_width);
            }
        )

        svgEllipses.append("text")
            .attr("class", "label")
            .attr("y", (d) => {return d.cy; })
            .attr("x", (d) => {return d.cx; })
            .text(function (d) {
                return d.text;
            });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default ArrowsExplanation;
