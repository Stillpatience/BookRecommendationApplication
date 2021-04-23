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
import * as d3 from "d3";
import {Paper} from "@material-ui/core";

export const InitializationBooks = () => {
    const classes = useStyles();
    let book_ids = [9, 41, 197, 203, 49, 42, 59, 61, 136, 65, 2, 7, 535, 76, 139, 433, 110, 251, 111, 913]
    let books = BooksCollection.find({"isbn":{$ne : "isbn"}, "id":{$in : book_ids}},{limit: 50}).fetch();
    while (typeof books === 'undefined'){
        books = BooksCollection.find({"isbn":{$ne : "isbn"}, "id":{$in : book_ids}},{limit: 50}).fetch();
    }
    books = books.sort(function (a, b) {
        return d3.ascending(a["title"], b["title"]);
    })


    let enoughBooks = false;

    return (
        <div>
            <div>
                <Paper className={classes.fixed_header} style={{backgroundColor: "rgb(98, 2, 238)", color: 'white', "zIndex": 100}}>
                    <Typography id="amount-of-books-selected" component="h5" style={{color: 'red'}}>
                        Selected 0/5 books.
                    </Typography>
                </Paper>
            </div>

            <div id="initialization-books-div" style={{"marginBottom": "4rem", "marginTop": "4rem"}}>
                <div className={classes.books_container}>
                    {books.map(book => {
                        const book_img = book["id"] + ".jpg"
                        return <div>
                        <div className={classes.books_item}>
                                <img id={book["isbn"]} src={book_img} width="98" height="146"
                                     alt="Loading" style={{opacity: 0.75}}
                                     onClick={() => {
                                        const bookISBN = book["isbn"];
                                        const bookID = book["id"];
                                        const element = document.getElementById(bookISBN);
                                        const checkElement = document.getElementById("check" + bookISBN);

                                        if (!selectedBooks.includes(bookID)) {
                                            selectedBooks.push(bookID);
                                            previouslyLikedBooks.push(bookID)
                                            element.style.border = "0.25rem solid rgb(98, 2, 238)";
                                            element.style.opacity = "1";
                                            checkElement.style.display = "block"
                                        } else {
                                            removeItemOnce(selectedBooks, bookID);
                                            removeItemOnce(previouslyLikedBooks, bookID);
                                            element.style.border = "";
                                            element.style.opacity = "0.75";
                                            checkElement.style.display = "none"

                                        }
                                        const countElement = document.getElementById("amount-of-books-selected");
                                        countElement.innerText = "Selected " + selectedBooks.length.toString() + "/5 books";
                                        if (selectedBooks.length >= 5) {
                                            countElement.style.color = "white"
                                        }
                                        else {
                                            countElement.style.color = "red"
                                        }
                                        enoughBooks = selectedBooks.length >= 5;
                                        if (enoughBooks) {
                                            const confirmButtonEnabled =
                                                document.getElementById( "confirm-selection-button-enabled");
                                            confirmButtonEnabled.style.display = "block"
                                            const confirmButtonDisabled =
                                                document.getElementById( "confirm-selection-button-disabled");
                                            confirmButtonDisabled.style.display = "none"


                                        } else{
                                            const confirmButtonEnabled =
                                                document.getElementById( "confirm-selection-button-enabled");
                                            confirmButtonEnabled.style.display = "none"
                                            const confirmButtonDisabled =
                                                document.getElementById( "confirm-selection-button-disabled");
                                            confirmButtonDisabled.style.display = "block"
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
                    <div id="confirm-selection-button-disabled" style={{display :"block", "zIndex": 100}}>
                        <Link to={RoutePaths.RATE_AND_DISCOVER}>
                            <Button
                                id="confirm-selection-button-disabled"
                                type="submit"
                                width={0.8 * window.innerWidth}
                                variant="contained"
                                disabled
                                color="primary"
                                className={classes.bottom_fixed}
                            >
                                Confirm selection
                            </Button>
                        </Link>
                    </div>
                    <div id="confirm-selection-button-enabled" style={{display :"none",  "zIndex": 100}}>
                        <Link to={RoutePaths.RATE_AND_DISCOVER}>
                            <Button
                                type="submit"
                                width={0.8 * window.innerWidth}
                                variant="contained"
                                color="primary"
                                className={classes.bottom_fixed}
                            >
                                Confirm selection
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>);
}