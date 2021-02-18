import React from "react";
import {RoutePaths} from "./RoutePaths";
import {BooksCollection} from "../api/links";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import {ratings, wantToReadBooks} from "./Books";
import {removeItemOnce} from "../utils/utils"
import {numberWithCommas} from "../utils/utils"



function setRating(user, book, newValue){
    ratings[[user, book]] = newValue;
}

function getRating(user, book){
    return ratings[[user, book]];
}

export const Book = () => {
    console.log("Loading book");
    const user = 1;

    const [stars, setStars] = React.useState(0);

    const url = window.location.href
    const isbn = url.substring(url.indexOf(RoutePaths.BOOK) + RoutePaths.BOOK.length + 1, url.length);
    let initState
    console.log(isbn);
    initState = !wantToReadBooks.includes(isbn);
    const [wantToRead, setWantToRead] = React.useState(initState);
    let book = BooksCollection.findOne({isbn: parseInt(isbn)});
    if (typeof book == 'undefined'){
        console.log("undefined")
        book = BooksCollection.findOne({isbn: isbn});
    }
    console.log(book);

    let description = book["description"];
    if (typeof description == 'undefined'){
        description = "No description found.";
    }
    else {
        description = description.substring(0,100) + '...'
    }

    const handleClick = () => {
        if (wantToRead){
            wantToReadBooks.push(isbn);
        }
        else{
            removeItemOnce(wantToReadBooks, isbn);
        }
        setWantToRead(!wantToRead);
    };
    return (
        <div>
            <Paper className="header">
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase>
                            <img id={book["isbn"]} src={book["small_image_url"]} alt="Unable to load image" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {book["title"]}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    by {book["authors"]}
                                </Typography>
                                <Typography variant="body2">
                                    ISBN: {book["isbn"]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    {description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Link to={RoutePaths.RATE_AND_DISCOVER}><CloseIcon style={{ color: 'white'}}/></Link>
                        </Grid>
                    </Grid>
                </Grid>

            </Paper>
            <div>
                <Grid container className="ratings-summary nobr">
                    <Grid item xs={6}  className="ratings-summary" align='left'>
                        <Typography variant="body2" color="textSecondary"  display="inline">
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="read-only" value={book["average_rating"]} readOnly />
                            </Box>

                        </Typography>
                    </Grid>
                    <Grid item xs  className="ratings-summary" align='right'>
                        <Typography variant="body2" color="textSecondary" >
                            <p>{numberWithCommas(parseInt(book["ratings_count"]))} ratings</p>
                        </Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary"  display="inline">
                            Rate this book:
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating
                                    name="simple-controlled"
                                    value={getRating(user, isbn) ? getRating(user, isbn) : stars}
                                    onChange={(event, newValue) => {
                                        setStars(newValue);
                                        setRating(user, isbn, newValue);
                                    }}
                                />
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item xs  >
                        <Button variant="contained" color={wantToRead ? "primary" : "inherit"} onClick={handleClick}>
                            Want to read
                        </Button>
                    </Grid>
                </Grid>
                <h3> Why am I seeing this?</h3>

            </div>

        </div>

    );
}