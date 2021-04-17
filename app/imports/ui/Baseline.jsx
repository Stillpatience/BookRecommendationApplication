import React, {Component} from "react";
import * as d3 from "d3";
import {BooksCollection} from "../api/links";
import {previouslyLikedBooks} from "../utils/utils";
import {getShortTitle} from "./Books";

class Baseline extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart(){
        const amountOfBooks = Object.keys(previouslyLikedBooks).length;
        const w = 0.9 * window.innerWidth;
        const booksPerLine = Math.floor(w / 98);
        const amountOfLines = Math.ceil(amountOfBooks / booksPerLine)

        const textHeight = 3
        const h = textHeight + (17 * amountOfLines) + "rem";
        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", w)
            .attr("height", h)
            .attr("id", "baseline")
            .style("display", "none")
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
            .text("Other books you have liked previously: ")

        let x_img = 0
        let current_width = 0
        let x = 0

        previouslyLikedBooks.forEach(book_id => {
            let book = BooksCollection.find({"id":parseInt(book_id)}, {}).fetch();
            let book_title = getShortTitle(book[0]);
            let image_url = "/" + book_id + ".jpg";
            let y_img = y + 2;
            svg.append("svg:image")
                .attr('x', x_img + "em")
                .attr('y', y_img + "em")
                .attr('width', 98)
                .attr('height', 146)
                .attr("xlink:href", image_url)
            current_width += 98;
            let y_text = y_img + 9;

            const fo = svg.append("foreignObject")
                .attr("x", x_img + "em")
                .attr("y", y_text + "rem")
                .attr("width", w)
                .attr("height", 300)
                .append('xhtml:div')
                .style("width", "98px")
                .attr("text-overflow", "ellipsis")
                .attr("overflow-wrap", "anywhere")
                .attr("overflow", "hidden")

            fo.append("p")
                .attr('x', x_img + "em")
                .attr('y', y_text + "rem")
                .attr("dy", ".35em")
                .style("font-family" , '"Roboto", "Helvetica", "Arial", sans-serif')
                .style("font-size", "1rem")
                .text(book_title)
            current_width += 98

            if (current_width > w) {
                y += 17
                x_img = 0
                current_width = 0
            } else {
                x += 10;
                x_img += 6.5;
            }


        })
    }
    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Baseline;
