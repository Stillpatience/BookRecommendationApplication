import React from "react";
import {Link} from "react-router-dom";
import {RoutePaths} from "./RoutePaths";
import {getShortTitle, wantToReadBooks} from "./Books";
import {BooksCollection} from "../api/links";
import SearchBar from "material-ui-search-bar";
import Typography from "@material-ui/core/Typography";
import {useStyles} from "./styles";
import {setBooks} from "../utils/utils";

export const MyBooks = () => {
    const classes = useStyles();

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