import React from 'react';
import {RoutePaths} from "./RoutePaths";
import {BooksCollection} from "../api/links";
import {useStyles} from "./styles";
import {removeItemOnce, selectedBooks} from "../utils/utils"
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export const InitializationBooks = () => {
    const classes = useStyles();
    const books = BooksCollection.find({"isbn":{$ne : "isbn"}},{sort: {title: 1}, limit: 20}).fetch();
    return (
        <div>
            <div className="grid-container">
                {books.map(book => {
                    const description = typeof book["description"] == 'undefined' ? "No description found" : book["description"];
                    return <div className="grid-item">
                        <div className="tooltip">
                            <img id={book["isbn"]} src={book["image_url"]} width="98" height="146" alt="Unable to load image" onClick={() => {
                                const bookISBN = book["isbn"];
                                const bookID = book["id"];
                                const element = document.getElementById(bookISBN);
                                if (!selectedBooks.includes(bookID)) {
                                    selectedBooks.push(bookID);
                                    element.style.border = "0.25rem solid rgb(98, 2, 238)";
                                } else {
                                    removeItemOnce(selectedBooks, bookID);
                                    element.style.border = "";
                                }
                            }}/>
                            <span className="tooltiptext">{description}</span>
                        </div>
                        <p className="word-wrap">{book["title"]}</p>
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
                        className={classes.submit}
                    >
                        Confirm selection
                    </Button>
                </Link>
            </div>
        </div>);
}