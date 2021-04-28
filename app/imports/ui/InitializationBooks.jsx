import React, {useState} from 'react';
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
import {Paper, Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import ClearIcon from '@material-ui/icons/Clear';

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
    const [selectMoreOpen, setSelectMoreOpen] = useState(false)

    const handleDisabledButtonClicked = () => {
        setSelectMoreOpen(true)
        const selectMoreButton =
            document.getElementById( "select-more-snackbar");
        selectMoreButton.style.display = "block"
    }

    const handleSelectMoreClose = () => {
        setSelectMoreOpen(false);
        const selectMoreButton =
            document.getElementById( "select-more-snackbar");
        selectMoreButton.style.display = "none"
    }
    let enoughBooks = false;

    return (
        <div>
            <div>
                    <Paper className={classes.fixed_header} style={{backgroundColor: "rgb(98, 2, 238)", color: 'white', "zIndex": 100}}>
                        <div style={{display: "flex"}}>
                            <div>

                                <Typography id="amount-of-books-selected" component="h5" >
                                    Selected 0/5 books.
                                </Typography>
                            </div>

                            <div id={"selection-clear-icon"} style={{color: 'red'}}>
                                <ClearIcon />
                            </div>
                            <div id={"selection-ok-icon"} style={{"display": "none"}}>
                                <CheckIcon />
                            </div>
                        </div>
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
                                            element.style.outline = "0.25rem solid rgb(98, 2, 238)";
                                            element.style.outlineOffset = "-3px"
                                            element.style.opacity = "1";
                                            checkElement.style.display = "block"
                                        } else {
                                            removeItemOnce(selectedBooks, bookID);
                                            removeItemOnce(previouslyLikedBooks, bookID);
                                            element.style.outline = "";
                                            element.style.opacity = "0.75";
                                            checkElement.style.display = "none"

                                        }
                                        const countElement = document.getElementById("amount-of-books-selected");
                                        countElement.innerText = "Selected " + selectedBooks.length.toString() + "/5 books";
                                        const okElement = document.getElementById("selection-ok-icon");
                                        const notOkElement = document.getElementById("selection-clear-icon");
                                        if (selectedBooks.length >= 5) {
                                            okElement.style.display = "block"
                                            notOkElement.style.display = "none"
                                        }
                                        else {
                                            okElement.style.display = "none"
                                            notOkElement.style.display = "block"
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
                        <Button
                            type="submit"
                            width={0.8 * window.innerWidth}
                            variant="contained"
                            className={classes.bottom_fixed}
                            onClick={handleDisabledButtonClicked}
                        >
                            Confirm selection
                        </Button>
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
                    <div id="select-more-snackbar" style={{display :"none"}}>
                        <Snackbar open={selectMoreOpen} autoHideDuration={2000} onClose={handleSelectMoreClose}>
                            <Alert onClose={handleSelectMoreClose} severity="warning">
                                Please select at least 5 books you like!
                            </Alert>
                        </Snackbar>
                    </div>
                </div>
            </div>
        </div>);
}