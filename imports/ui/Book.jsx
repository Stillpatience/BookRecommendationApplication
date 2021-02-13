import React from "react";
import {RoutePaths} from "./RoutePaths";
import {BooksCollection} from "../api/links";

export const Book = () => {
    const url = window.location.href
    const isbn = url.substring(url.indexOf(RoutePaths.BOOK) + RoutePaths.BOOK.length + 1, url.length);
    const book = BooksCollection.findOne({isbn: parseInt(isbn)});
    return (
        <div>
            <img id={book["isbn"]} src={book["image_url"]} width="98" height="146" alt="Unable to load image"/>
            <div className="container">
                <p><small>{book["title"]}</small></p>
            </div>
        </div>
    );
}