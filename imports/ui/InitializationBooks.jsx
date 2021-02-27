import React from 'react';
import {RoutePaths} from "./RoutePaths";
import {BooksCollection} from "../api/links";
import {useStyles} from "./styles";
import {removeItemOnce} from "../utils/utils"
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export const InitializationBooks = () => {
    const selectedBooks = [];
    const classes = useStyles();
    const books = BooksCollection.find({"isbn":{$ne : "isbn"}},{sort: {title: 1}, limit: 20}).fetch();

    return (
        <div>
            <div className="grid-container">
                {books.map(book =>
                    <div className="grid-item">
                        <img id={book["isbn"]} src={book["image_url"]} alt="Unable to load image" onClick={() => {const bookId = book["isbn"];
                            const element = document.getElementById(bookId);
                            if (!selectedBooks.includes(bookId)){
                                selectedBooks.push(bookId);
                                element.style.border = "0.1rem solid rgb(98, 2, 238)";
                            }
                            else{
                                removeItemOnce(selectedBooks, bookId);
                                element.style.border = "";
                            }
                        }}/>
                        <p className="word-wrap">{book["title"]}</p>
                    </div>
                )}
            </div>
            <div>
                <Link to={RoutePaths.RATE_AND_DISCOVER}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Confirm selection
                    </Button>
                </Link>
            </div>
        </div>);
}