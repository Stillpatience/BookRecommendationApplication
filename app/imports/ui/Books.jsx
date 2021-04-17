import React from 'react';
import {BooksCollection, SimilarBooksCollection} from '../api/links';
import {RoutePaths} from "./RoutePaths";
import {Link} from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import {recommendedBooks, updateRecommendations, visualizationsMap} from "../utils/utils";
import {useStyles} from "./styles";
import Typography from "@material-ui/core/Typography";

export var wantToReadBooks = [];
export var ratings = {};
export var genresMap = {};

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

export const getShortTitle = (book) =>{
    let book_title = book["title"].toString();
    if (typeof book_title !== "undefined" && book_title.includes("(")){
        book_title = book_title.substring(0, book_title.indexOf("("));
    }

    if (typeof book_title !== "undefined" && book_title.includes(":")){
        book_title = book_title.substring(0, book_title.indexOf(":"));
    }
    return book_title;
}

//TODO: remove this
const hideVisualizations = () => {
    for (let key in visualizationsMap) {
        if (visualizationsMap.hasOwnProperty(key)) {
            const node = document.getElementById(visualizationsMap[key]);
            if (node !== null){
                node.style.display = "none";
            }
        }
    }
}
export const Books = () => {
    const classes = useStyles();

    let books;
    while (typeof books === 'undefined'){
        books = BooksCollection.find({"isbn":{$ne : "isbn"}}).fetch();
    }

    let similar_books;
    while (typeof similar_books === 'undefined') {
        similar_books = SimilarBooksCollection.find({}).fetch();
    }


    updateRecommendations(similar_books, books);

    if (recommendedBooks.length !== 0){
        books = recommendedBooks;
    }
    hideVisualizations();

    return (
        <div>
            <div>
                <SearchBar
                    onChange={(newValue) => {setBooks(books, newValue);}
                    }
                    placeholder="Title, author, keyword or ISBN"
                    autoFocus
                />
            </div>
            <div className={classes.books_container} id="books">
                {
                    books.map(book =>
                        <div className={classes.books_item} id={book["title"]}>
                            <Link to={RoutePaths.BOOK + "/" + book["isbn"]}>
                                <img id={book["isbn"]} src={book["id"] + ".jpg"} width="98" height="146"
                                alt="Loading"/>
                            </Link>
                            <small><Typography className={classes.word_wrap} >{getShortTitle(book)}</Typography></small>
                        </div>
                )}
            </div>
        </div>);
}

