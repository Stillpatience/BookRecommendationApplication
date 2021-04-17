import React, {Component} from "react";
import * as d3 from "d3";
import {BooksCollection} from "../api/links";
import {genresMap, getShortTitle} from "./Books";

class OtherBookExplanation extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart(){
        const genresToBooks = {};
        for (const key in genresMap) {
            if (genresMap.hasOwnProperty(key)) {
                const genres = genresMap[key];
                genres.forEach(genre => {
                    if (typeof genresToBooks[genre] == 'undefined'){
                        genresToBooks[genre] = [key]
                    }else{
                        genresToBooks[genre].push(key)
                    }
                })
            }
        }
        const w = window.innerWidth;
        const h = ((17 * Object.keys(genresToBooks).length)  + 10) + "rem";

        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", w)
            .attr("height", h)
            .attr("id", "other-books")
            .style("margin-left", 100);


        let y = 2

        const fo1 = svg.append("foreignObject")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", w)
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
            .text("Other books you read contain the same genres: ")

        for (const key in genresToBooks) {
            if (genresToBooks.hasOwnProperty(key)) {
                const books = genresToBooks[key];
                let y_title = y
                const fo = svg.append("foreignObject")
                    .attr("x", 0)
                    .attr("y", y_title + "rem")
                    .attr("width", w)
                    .attr("height", 300)
                    .append('xhtml:div')
                    .attr("text-overflow", "ellipsis")
                    .attr("overflow-wrap", "anywhere")
                    .attr("overflow", "hidden")


                fo.append("p")
                    .attr('x', 0)
                    .attr('y', y_title + "rem")
                    .attr("dy", ".35em")
                    .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
                    .style("font-size", "1.2rem")
                    .style("font-weight", "bold")
                    .text(key)

                let x_img = 0
                books.forEach(book_id => {
                    let book = BooksCollection.find({"id":parseInt(book_id)}, {}).fetch();
                    let image_url = "/" + book_id + ".jpg";
                    let book_title = getShortTitle(book[0]);

                    let y_img = y + 3;
                    svg.append("svg:image")
                        .attr('x', x_img + "rem")
                        .attr('y', y_img + "rem")
                        .attr('width', 98)
                        .attr('height', 146)
                        .attr("xlink:href", image_url)

                    let y_text = y_img + 9;

                    const fo = svg.append("foreignObject")
                        .attr("x",  x_img + "rem")
                        .attr("y", y_text + "rem")
                        .attr("width", w)
                        .attr("height", 300)
                        .append('xhtml:div')
                        .style("width", "98px")
                        .style("height", "98px")
                        .attr("text-overflow", "ellipsis")
                        .attr("overflow-wrap", "anywhere")
                        .attr("overflow", "hidden")


                    fo.append("p")
                        .attr('x', x_img + "rem")
                        .attr('y', y_text + "rem")
                        .attr("dy", ".35em")
                        .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
                        .attr("font-size", "1em")
                        .text(book_title)
                    x_img += 7
                })
                y += 17

            }
        }

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default OtherBookExplanation;