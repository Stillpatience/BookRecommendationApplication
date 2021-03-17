import React, {Component} from 'react';
import * as d3 from "d3";
import {getHighestCountMap, countGenresMap, countSimilarGenres} from "../utils/utils";
import {genresMap, getGenresFromID} from "./Books";
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
        const h = "20rem";
        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", w)
            .attr("height", h)
            .attr("id", "visualization")
            .style("margin-left", 100);

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", "10rem")
            .attr("cx", "47%")
            .attr("cy", "50%")
            .attr("stroke", "rgb(98, 2, 238)")
            .attr("fill", "none")
            .attr("stroke-width", "3")
        svg.append("text")
            .attr("x", "65%")
            .attr("y", "10%")
            .attr("dy", ".35em")
            .attr("font-size", "2em")
            .text("This book");
        svg.append("text")
            .attr("x", "27%")
            .attr("y", "10%")
            .attr("dy", ".35em")
            .attr("font-size", "2em")
            .text("Your interests");
        svg.append("circle")
            .attr("r", "10rem")
            .attr("cx", "57%")
            .attr("cy", "50%")
            .attr("stroke", "rgb(98, 2, 238)")
            .attr("fill", "none")
            .attr("stroke-width", "3")

        let x = 57
        let y = 10
        recommended_genres.forEach(text =>
            {
                svg.append("text")
                .attr("x", x.toString() + "%")
                .attr("y", y.toString() + "%")
                .attr("dy", ".35em")
                .text(text);
                y += 10;
            }
        );

        x = 43
        y = 10
        my_genres.forEach(text =>
            {
                svg.append("text")
                    .attr("x", x.toString() + "%")
                    .attr("y", y.toString() + "%")
                    .attr("dy", ".35em")
                    .text(text);
                y += 10;
            }
        );

        //const overlap = ["Genre1A", "Genre2B", "Genre3C"]
        x = 50
        y = 20
        overlap_genres.forEach(genre =>
            {
                svg.append("text")
                    .attr("x", x.toString() + "%")
                    .attr("y", y.toString() + "%")
                    .attr("dy", ".35em")
                    .attr("font-size", genre["value"] / 100 + "em")
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
