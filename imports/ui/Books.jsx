import React from 'react';
import {BooksCollection} from '../api/links';
import {RoutePaths} from "./RoutePaths";
import {Link, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
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
    books = BooksCollection.find({"title":regex}).fetch();
    const node = document.getElementById("books");
    ReactDOM.unmountComponentAtNode(node);
    node.innerHTML = "";
   // node.innerHTML = '';
    //const element = books.forEach(book => {"<p>" + book["title"] + "</p>"});
    console.log(books[0]["title"]);
    //const element = <p> {books[0]["title"]}</p>;
   // const element = <h1>test</h1>;
   // ReactDOM.render(element, document.getElementById('books'))
    let cards = [];
    books.forEach(book => cards.push(
            <Route to={RoutePaths.BOOK + "/" + book["isbn"]}>
                <div className="column">
                    <div className="card">
                        <img id={book["isbn"]} src={book["image_url"]} width="98" height="146" alt="Unable to load image"/>
                        <div className="container">
                            <p><small>{book["title"]}</small></p>
                        </div>
                    </div>
                </div>
            </Route>
        ));
    console.log(cards);
    const parent = document.getElementById('books');
    ReactDOM.render(<div>{cards}</div>, parent);
//        const parent = document.getElementById('books');
//         ReactDOM.render(element, parent);
    //ReactDOM.render(element, document.getElementById('books'));

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
            <div className="flex-container wrap" id="books">
                {books.map(book =>
                <Link to={RoutePaths.BOOK + "/" + book["isbn"]}>
                <div className="column">
                    <div className="card">
                        <img id={book["isbn"]} src={book["small_image_url"]} alt="Unable to load image"/>
                        <div className="word-wrap">
                            <p><small>{book["title"]}</small></p>
                        </div>
                    </div>
                </div>
                </Link>)}
            </div>
        </div>);
}