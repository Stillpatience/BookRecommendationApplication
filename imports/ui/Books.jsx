import React from 'react';
import {BooksCollection} from '../api/links';
import {RoutePaths} from "./RoutePaths";
import {Link} from "react-router-dom";
import SearchBar from "material-ui-search-bar";
export var wantToReadBooks = [];
export var ratings = {};

function search(value) {
    console.log(value);
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function setBooks(books, search){
    const regex = new RegExp(escapeRegex(search), 'gi');
    books = BooksCollection.find({"original_title":regex}).fetch();
    const node = document.getElementById("books");
    node.innerHTML = '';
    books.forEach(book => {
        const img_node = document.createElement("IMG");
        img_node.src = book["image_url"];
        node.appendChild(img_node);
    });

}
export const Books = () => {
    const books = BooksCollection.find({"isbn":{$ne : "isbn"}},{sort: {title: 1}, limit: 20}).fetch();
    return (
        <div>
            <div>
                <SearchBar
                    onChange={(newValue) => setBooks(books, newValue)}
                    onRequestSearch={search}
                    placeholder="Title, author, keyword or ISBN"
                    autoFocus
                />
            </div>
            <div className="row" id="books">{books.map(book =>
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
            </div>
        </div>);
}