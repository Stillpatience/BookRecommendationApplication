import React, {Component} from "react";
import * as d3 from "d3";
import {BooksCollection} from "../api/links";
import {previouslyLikedBooks} from "../utils/utils";

class Baseline extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart(){

        const w = window.innerWidth;
        const h = "60rem";
        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", w)
            .attr("height", h)
            .attr("id", "baseline")
            .style("margin-left", 100);

        let y = 2

        svg.append("text")
            .attr("x", 0)
            .attr("y", y + "em")
            .attr("dy", ".35em")
            .attr("font-size", "1em")
            .attr("font-weight", "bold")
            .attr("overflow", "ellipsis")
            .text("Other books you have liked previously: ");

        let x_img = 0

        previouslyLikedBooks.forEach(book_id => {
            let book = BooksCollection.find({"id":parseInt(book_id)}, {}).fetch();
            let book_title = book[0]["title"];
            let image_url = "/" + book_id + ".jpg";

            let y_img = y + 2;
            svg.append("svg:image")
                .attr('x', x_img + "em")
                .attr('y', y_img + "em")
                .attr('width', 98)
                .attr('height', 146)
                .attr("xlink:href", image_url)

            let y_text = y_img + 10;
            svg.append("text")
                .attr('x', x_img + "em")
                .attr('y', y_text + "em")
                .attr("dy", ".35em")
                .attr("text-length", "6em")
                .attr("font-size", "1em")
                .text(book_title)
            y += 14

        })
    }
    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Baseline;
