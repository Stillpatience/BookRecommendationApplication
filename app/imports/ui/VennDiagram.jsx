import React, {Component} from 'react';
import * as d3 from "d3";
import {getHighestCountMap, countGenresMap, countSimilarGenres} from "../utils/utils";
import {genresMap} from "./Books";
import {GenresCollection} from "../api/links";

class VennDiagram extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        let genresCount = countGenresMap();

        const similarGenresCount = countSimilarGenres(genresCount, this.props.book_id);

        let overlap_genres = getHighestCountMap(similarGenresCount);


        //sort bars based on value
        overlap_genres = overlap_genres.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        })

        //These are the genres in this book
        let book_genres = GenresCollection.find({"id":this.props.book_id}, {}).fetch();
        let recommended_genres = [];
        book_genres.forEach(genre => {
                const genre_name = genre["genres"];
                let in_overlap = false;
                overlap_genres.forEach(overlap_genre => {
                    if (overlap_genre["name"] === genre_name){
                        in_overlap = true;
                    }
                })
                if(!in_overlap){
                    recommended_genres.push(genre_name);
                }
            }
        )
        let my_genres = [];
        for (const key in genresMap) {
            if (genresMap.hasOwnProperty(key)) {
                const genres = genresMap[key];
                genres.forEach(genre => {
                    let in_overlap = false;
                    overlap_genres.forEach(overlap_genre => {
                        if (overlap_genre["name"] === genre){
                            in_overlap = true;
                        }
                    })
                    if (!in_overlap && !recommended_genres.includes(genre)){
                        my_genres.push(genre);
                    }
                })
            }
        }

        const data = [12, 5, 6, 6, 9, 10];
        const w = window.innerWidth;
        const h = 0.5 * window.innerWidth;
        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", w)
            .attr("height", h)
            .attr("id", "venn-diagram");

        svg.selectAll("circle")
            .data(data)
            .enter()

        const cy = 0.5*h
        const r = 0.22*w
        svg.append("circle")
            .attr("r", r)
            .attr("cx", 0.35*w)
            .attr("cy", cy)
            .attr("fill", "rgb(98, 2, 238)")
            .attr("opacity", 0.5)
            .attr("stroke", "rgb(98, 2, 238)")
            .attr("stroke-width", "3")

        svg.append("text")
            .attr("x", 0.85*w)
            .attr("y", 0.1*h)
            .attr("dy", ".35rem")
            .attr("font-size", "1rem")
            .attr("text-anchor", "middle")
            .text("This book");

        svg.append("text")
            .attr("x", 0.15*w)
            .attr("y", 0.1*h)
            .attr("dy", ".35rem")
            .attr("font-size", "1rem")
            .attr("text-anchor", "middle")
            .text("Your interests");

        svg.append("circle")
            .attr("r",  r)
            .attr("cx", 0.65*w)
            .attr("cy", cy)
            .attr("fill", "rgb(98, 2, 238)")
            .attr("opacity", 0.5)
            .attr("stroke", "rgb(98, 2, 238)")
            .attr("stroke-width", "3")

        let x = 65
        let y = cy - 0.6*r

        recommended_genres.forEach(text =>
            {
                svg.append("text")
                .attr("x", x.toString() + "%")
                .attr("y", y)
                .attr("dy", ".35rem")
                .attr("fill", "white")
                .attr("text-anchor", "left")
                .text(text);
                y += 20;
            }
        );

        x = 25
        y =  cy - 0.6*r

        my_genres.forEach(text =>
            {
                svg.append("text")
                    .attr("x", x.toString() + "%")
                    .attr("y", y)
                    .attr("dy", ".35rem")
                    .attr("fill", "white")
                    .attr("text-anchor", "middle")
                    .text(text);
                y += 20;
            }
        );

        x = 50
        y = 35
        overlap_genres.forEach(genre =>
            {
                svg.append("text")
                    .attr("x", x.toString() + "%")
                    .attr("y", y.toString() + "%")
                    .attr("dy", ".35rem")
                    .attr("fill", "white")
                    .attr("font-size", genre["value"] / 100 + "rem")
                    .attr("text-anchor", "middle")
                    .text(genre["name"]);
                y += 10;
            }
        );

    }

    render(){
        return <div></div>
    }

}

export default VennDiagram;
