import React from 'react';
import {BooksCollection} from '../api/links';
import {RoutePaths} from "./RoutePaths";
import {Link} from "react-router-dom";


export const Books = () => {

    const books = BooksCollection.find({},{sort: {title: 1}, limit: 10}).fetch();

    console.log(books);
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