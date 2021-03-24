import React from 'react';
import {BooksCollection, SimilarBooksCollection} from '../api/links';
import {RoutePaths} from "./RoutePaths";
import {Link} from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import {recommendedBooks, updateRecommendations, visualizationsMap} from "../utils/utils";

export var wantToReadBooks = [];
export var ratings = {};
export var genresMap = {};

function setBooks(books, search, prevSearch){
    if (prevSearch.length > search.length){

    }
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

export const getGenresFromID = (genres, id) => {
    genres.forEach(genre => {
        if (genre["id"] === id){
            if (typeof genresMap[id] == 'undefined'){
                genresMap[id] = [genre["genres"]];
            } else {
                genresMap[id] = genresMap[id].push(genre["genres"]);
            }
        }
        }
    )
}

const hideVisualizations = () => {
    for (let key in visualizationsMap) {
        // check if the property/key is defined in the object itself, not in parent
        if (visualizationsMap.hasOwnProperty(key)) {
            const node = document.getElementById(visualizationsMap[key]);
            if (node !== null){
                node.style.display = "none";
            }
        }
    }
}
export const Books = () => {
    let books = BooksCollection.find({"isbn":{$ne : "isbn"}},{sort: {title: 1}}).fetch();
    let similar_books = SimilarBooksCollection.find({},{sort: {id: 1}, limit: 1000}).fetch();

    updateRecommendations(similar_books, books);

    if (recommendedBooks.length !== 0){
        books = recommendedBooks;
    }
    hideVisualizations();
    let prevSearch = "";
    return (
        <div>
            <div>
                <SearchBar
                    onChange={(newValue) => {
                        setBooks(books, newValue, prevSearch);
                        prevSearch = newValue;
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
                            <img id={book["isbn"]} src={book["image_url"]} width="98" height="146" alt="Unable to load image"/>
                        </Link>
                        <div className="word-wrap">
                            <p>{book["title"]}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>);
}

