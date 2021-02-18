import React from 'react';
import {RoutePaths} from "./RoutePaths";
import {BooksCollection} from "../api/links";
import {useStyles} from "./styles";
import {removeItemOnce} from "../utils/utils"
import Button from "@material-ui/core/Button";

export const InitializationBooks = () => {
    const selectedBooks = [];
    const classes = useStyles();
    const books = BooksCollection.find({"isbn":{$ne : "isbn"}},{sort: {title: 1}, limit: 20}).fetch();

    return (
        <div>
            <div className={classes.flex_display}>
                {books.map(book =>
                    <div className={classes.book_card}
                         id={book["isbn"]}
                         onClick={() => {const bookId = book["isbn"];
                                            const element = document.getElementById(bookId);
                                             if (!selectedBooks.includes(bookId)){
                                                 selectedBooks.push(bookId);
                                                 element.style.border = "0.5rem solid rgb(98, 2, 238)";
                                             }
                                             else{
                                                 removeItemOnce(selectedBooks, bookId);
                                                 element.style.border = "";
                                             }
                                            }}>
                        <img src={book["image_url"]} width="98" height="146" alt="Unable to load image"/>
                        <p><small>{book["title"]}</small></p>
                    </div>
                )}
            </div>
            <div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href={RoutePaths.RATE_AND_DISCOVER}
                >
                    Confirm selection
                </Button>
            </div>
        </div>);
}