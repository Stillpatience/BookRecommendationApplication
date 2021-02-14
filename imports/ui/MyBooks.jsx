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
        <div className="row">{books.map(book =>
            <Link to={RoutePaths.BOOK + "/" + book["isbn"]}>
                <div className="column">
                    <div className="card">
                        <img id={book["isbn"]} src={book["image_url"]} width="98" height="146" alt="Unable to load image"/>
                        <div className="container">
                            <p><small>{book["title"]}</small></p>
                        </div>
                    </div>
                </div>
            </Link>)}
        </div>);
}