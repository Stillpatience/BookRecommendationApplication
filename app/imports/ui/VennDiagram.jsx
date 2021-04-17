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
                if(!in_overlap && !recommended_genres.includes(genre_name)){
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
                    if (!in_overlap && !recommended_genres.includes(genre) && !my_genres.includes(genre)){
                        my_genres.push(genre);
                    }
                })
            }
        }

        const data = [12, 5, 6, 6, 9, 10];
        const w = 0.95 * window.innerWidth;
        const h = 0.6 * window.innerWidth;
        const bottomHeight = 20;
        const textHeight = 100;
        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", w )
            .attr("height", h + textHeight + bottomHeight)
            .attr("id", "venn-diagram")
            .style("display", "none");

        const fo = svg.append("foreignObject")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", w)
            .attr("height", textHeight)
            .append('xhtml:div')

        fo
            .append('p')
            .style("text-align", "left")
            .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
            .html("Your interests ")
            .append('span')
            .style('float', 'right')
            .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
            .html("This book ")



        svg.selectAll("circle")
            .data(data)
            .enter()

        const cx = 0.35*w;
        const cy = 0.6*h
        const r = 0.22*w
        svg.append("circle")
            .attr("r", r)
            .attr("cx", cx)
            .attr("cy", cy)
            .attr("fill", "rgb(98, 2, 238)")
            .attr("opacity", 0.5)
            .attr("stroke", "rgb(98, 2, 238)")
            .attr("stroke-width", "3")

        svg.append("circle")
            .attr("r",  r)
            .attr("cx", 0.65*w)
            .attr("cy", cy)
            .attr("fill", "rgb(98, 2, 238)")
            .attr("opacity", 0.5)
            .attr("stroke", "rgb(98, 2, 238)")
            .attr("stroke-width", "3")

        let x = 75
        let y = cy - 0.6*r
        let recommended_genres_count = 0
        recommended_genres.forEach(text => {
                if (recommended_genres_count < 6) {
                    svg.append("text")
                        .attr("x", x.toString() + "%")
                        .attr("y", y)
                        .attr("dy", ".35rem")
                        .attr("text-anchor", () => {
                            if (text.length > 9) {
                                return "middle"
                            } else {
                                return "end"
                            }
                        })
                        .style("font-family", '"Roboto", "Helvetica", "Arial", sans-serif')
                        .attr("font-size", 0.7 + "rem")
                        .text(text);
                    y += 20;
                    recommended_genres_count++;
                }
            }
        );

        x = 25
        y =  cy - 0.6*r

        let my_genres_count = 0;
        my_genres.forEach(text =>
            {
                if (my_genres_count < 6) {

                    svg.append("text")
                        .attr("x", x.toString() + "%")
                        .attr("y", y)
                        .attr("dy", ".35rem")
                        .attr("text-anchor", () => {
                            if (text.length > 9){
                                return "middle"
                            }
                            else {
                                return "start"
                            }
                        })
                        .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
                        .attr("font-size", 0.7 + "rem")
                        .text(text);
                    y += 20;
                    my_genres_count++;
                }
            }
        );

        x = 50
        y = 30
        let overlap_genres_count = 0;
        overlap_genres.forEach(genre =>
            {
                if (overlap_genres_count < 6) {
                    svg.append("text")
                        .attr("x", x.toString() + "%")
                        .attr("y", y.toString() + "%")
                        .attr("dy", ".35rem")
                        .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
                        .attr("font-size", 0.7 + "rem")
                        .attr("text-anchor", "middle")
                        .text(genre["name"]);
                    y += 5;
                    overlap_genres_count++;
                }
            }
        );

    }

    render(){
        return <div></div>
    }

}

export default VennDiagram;
