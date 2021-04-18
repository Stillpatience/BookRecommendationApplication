import React from 'react';
import {BooksCollection, SimilarBooksCollection} from '../api/links';
import {RoutePaths} from "./RoutePaths";
import {Link} from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import {hideVisualizations, recommendedBooks, setBooks, updateRecommendations} from "../utils/utils";
import {useStyles} from "./styles";
import Typography from "@material-ui/core/Typography";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export var wantToReadBooks = [];
export var ratings = {};
export var genresMap = {};

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

export const Books = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

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
    const handleClose = () => {
        setOpen(false);
        props.setFirstTimeBooks(false);
        const snackbar = document.getElementById("welcome-snackbar");
        snackbar.style.display = "none";
    }

    return (
        <div id="books-div" style={{"margin-bottom": "4rem"}}>
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
            <div id="welcome-snackbar" style={{display :"block"}}>
                <Snackbar open={open && props.firstTimeBooks} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info">
                        Welcome to GreatReads!
                    </Alert>
                </Snackbar>
            </div>
        </div>);
}

