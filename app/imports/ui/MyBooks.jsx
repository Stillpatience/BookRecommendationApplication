import React from "react";
import {Link} from "react-router-dom";
import {RoutePaths} from "./RoutePaths";
import {wantToReadBooks} from "./Books";
import {BooksCollection} from "../api/links";
import SearchBar from "material-ui-search-bar";

function setBooks(books, search){
    let titles = []
    const new_books = BooksCollection.find({"title" : {$regex : ".*"+search+".*", $options: 'i'}}).fetch();
    new_books.forEach(book =>
        titles.push(book["title"])
    )

    const node = document.getElementById("books");

    const children = node.childNodes;
    children.forEach(child =>
        {
            if (!titles.includes(child.id)){
                child.style.display = "none";
            } else {
                child.style.display = "block";
            }
        }
    )
}

export const MyBooks = () => {
    let books = [];
    for (let i=0; i < wantToReadBooks.length; i++){
        books.push(BooksCollection.findOne({isbn: parseInt(wantToReadBooks[i])}));
    }
    return (
        <div>
        <div>
            <SearchBar
                onChange={(newValue) => {
                    setBooks(books, newValue);
                }
                }
                placeholder="Title, author, keyword or ISBN"
                autoFocus
            />
        </div>
        <div className="grid-container" id="books">
            {
                books.map(book =>
                    <div className="grid-item" id={book["title"]}>
                        <Link to={RoutePaths.BOOK + "/" + book["isbn"]}>
                            <img id={book["isbn"]} src={book["id"] + ".jpg"} alt="Loading" width="98" height="146" />
                        </Link>
                        <div className="word-wrap">
                            <p>{book["title"]}</p>
                        </div>
                    </div>
                )}
        </div>
        </div>);
}