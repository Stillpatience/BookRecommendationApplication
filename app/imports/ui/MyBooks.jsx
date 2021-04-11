import React from "react";
import {Link} from "react-router-dom";
import {RoutePaths} from "./RoutePaths";
import {wantToReadBooks} from "./Books";
import {BooksCollection} from "../api/links";

export const MyBooks = () => {
    let books = [];
    for (let i=0; i < wantToReadBooks.length; i++){
        books.push(BooksCollection.findOne({isbn: parseInt(wantToReadBooks[i])}));
    }
    return (
        <div className="grid-container" id="books">
            {
                books.map(book =>
                    <div className="grid-item" id={book["title"]}>
                        <Link to={RoutePaths.BOOK + "/" + book["isbn"]}>
                            <img id={book["isbn"]} src={book["image_url"]} width="98" height="146" />
                        </Link>
                        <div className="word-wrap">
                            <p>{book["title"]}</p>
                        </div>
                    </div>
                )}
        </div>);
}