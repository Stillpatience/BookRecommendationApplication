import React from 'react';
import {BooksCollection} from "../db/BooksCollections";

export const Books = () => {
    const books = BooksCollection.find({},{sort: {title: 1}, limit: 13}).fetch();
    console.log(books);
    return (
        <a href="http://google.com">
            <div className="row">{books.map(book =>
                <div className="column">
                    <div className="card">
                        <img id={book["isbn"]} src={book["image_url"]} width="98" height="146" alt="Unable to load image"/>
                        <div className="container">
                            <p><small>{book["title"]}</small></p>
                        </div>
                    </div>
                </div>)}
            </div>
        </a>);
}