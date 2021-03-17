import React, {Component} from "react";
import * as d3 from "d3";
import {getBookFromID} from "../utils/utils";
import {BooksCollection, FullBooksCollection, GenresCollection} from "../api/links";
import {genresMap} from "./Books";

class OtherBookExplanation extends Component {
    componentDidMount() {
        this.drawChart();
    }

    drawChart(){
        let books = BooksCollection.find({"isbn":{$ne : "isbn"}},{sort: {title: 1}, limit: 20}).fetch();
        //const genresToBooks = {"Science Fiction": [1,2,3], "Fantasy": [3,4,5,6]}
        const w = window.innerWidth;
        const h = "60rem";
        const svg = d3.select("#navigation")
            .insert("svg",":first-child")
            .attr("width", w)
            .attr("height", h)
            .attr("id", "visualization")
            .style("margin-left", 100);
        d3.image(
            `http://lorempixel.com/200/200/`,
            { crossOrigin: "anonymous" }).then((img) => {
            document.body.append("Image using d3.image()");
            document.body.append(img);
        });
        console.log(this.props.book_id);
        const genresToBooks = {};
        for (const key in genresMap) {
            if (genresMap.hasOwnProperty(key)) {
                const genres = genresMap[key];
                genres.forEach(genre => {
                    console.log("key", key);
                    if (typeof genresToBooks[genre] == 'undefined'){
                        genresToBooks[genre] = [key]
                    }else{
                        genresToBooks[genre].push(key)
                    }
                })
            }
        }
        let y = 2
        svg.append("text")
            .attr("x", 0)
            .attr("y", "1em")
            .attr("dy", ".35em")
            .attr("font-size", "1em")
            .text("Other books you read contain the same genres: ");

        for (const key in genresToBooks) {
            if (genresToBooks.hasOwnProperty(key)) {
                const books = genresToBooks[key];
                svg.append("text")
                    .attr("x", 0)
                    .attr("y", y + "em")
                    .attr("dy", ".35em")
                    .attr("font-size", "1em")
                    .attr("font-weight", "bold")
                    .attr("id", key + "title")
                    .attr("overflow", "ellipsis")
                    .text(key);

                let x_img = 0
                books.forEach(book_id => {

                    console.log("book_id", book_id);
                    let book = BooksCollection.find({"id":parseInt(book_id)}, {}).fetch();
                    console.log("book", book[0]["image_url"]);
                    let image_url = book[0]["image_url"];
                    let book_title = book[0]["title"];

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
                    x_img += 14

                })
                y += 15

            }
        }

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default OtherBookExplanation;