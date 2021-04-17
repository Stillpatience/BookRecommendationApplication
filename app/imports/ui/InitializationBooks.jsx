import React from 'react';
import {RoutePaths} from "./RoutePaths";
import {BooksCollection} from "../api/links";
import {useStyles} from "./styles";
import {previouslyLikedBooks, removeItemOnce, selectedBooks} from "../utils/utils"
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CheckIcon from '@material-ui/icons/Check';
import {getShortTitle} from "./Books";

export const InitializationBooks = () => {
    const classes = useStyles();
    let books = BooksCollection.find({"isbn":{$ne : "isbn"}},{limit: 50}).fetch();
    while (typeof books === 'undefined'){
        books = BooksCollection.find({"isbn":{$ne : "isbn"}},{limit: 50}).fetch();
    }
    return (
        <div>
            <div className={classes.books_container}>
                {books.map(book => {
                    const book_img = book["id"] + ".jpg"
                    return <div>
                    <div className={classes.books_item}>
                            <img id={book["isbn"]} src={book_img} width="98" height="146"
                                 alt="Loading" onClick={() => {
                                    const bookISBN = book["isbn"];
                                    const bookID = book["id"];
                                    const element = document.getElementById(bookISBN);
                                    const checkElement = document.getElementById("check" + bookISBN);

                                    if (!selectedBooks.includes(bookID)) {
                                        selectedBooks.push(bookID);
                                        previouslyLikedBooks.push(bookID)
                                        element.style.opacity = "0.5";
                                        checkElement.style.display = "block"
                                    } else {
                                        removeItemOnce(selectedBooks, bookID);
                                        removeItemOnce(previouslyLikedBooks, bookID);
                                        element.style.opacity = "1";
                                        checkElement.style.display = "none"

                                    }
                                 }
                             }/>
                        <CheckIcon id={"check" + book["isbn"]} style={{color: "green", display :"none"}}/>
                        <Typography className={classes.word_wrap} >{getShortTitle(book)}</Typography>
                    </div>
                    </div>


                })}
            </div>
            <div>
                <Link to={RoutePaths.RATE_AND_DISCOVER}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.bottom_fixed}
                    >
                        Confirm selection
                    </Button>
                </Link>
            </div>
        </div>);
}