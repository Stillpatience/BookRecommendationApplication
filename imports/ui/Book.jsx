import React from "react";
import {RoutePaths} from "./RoutePaths";
import {BooksCollection} from "../api/links";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import {wantToReadBooks} from "./Books";
import {getRating, removeItemOnce, setRating} from "../utils/utils"
import {numberWithCommas} from "../utils/utils"
import {Card, CardContent, CardMedia} from "@material-ui/core";
import VennDiagram from "./VennDiagram";

export const Book = () => {
    const user = 1;

    const [stars, setStars] = React.useState(0);

    const url = window.location.href
    const isbn = url.substring(url.indexOf(RoutePaths.BOOK) + RoutePaths.BOOK.length + 1, url.length);
    let initState

    initState = !wantToReadBooks.includes(isbn);
    const [wantToRead, setWantToRead] = React.useState(initState);
    let book = BooksCollection.findOne({isbn: parseInt(isbn)});
    if (typeof book == 'undefined'){
        book = BooksCollection.findOne({isbn: isbn});
    }

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
    const authors = book["authors"];
    let res = authors.split(" ");
    const author = res[0] + " " + res[1];
    const book_id = book["id"];
    console.log(book_id)
    return (
        <div>
            <Card className="flex header">
                <CardMedia
                    title={book["title"]}
                />
                    <img src={book["image_url"]} alt="Unable to load image" height="150"/>
                <CardMedia />
                <div className= "flex header">
                    <CardContent>
                        <p>{book["title"]}</p>
                        <Typography variant="subtitle2" color="white">
                            <small><em>ISBN {book["isbn"]}</em></small>
                        </Typography>
                        <Typography variant="subtitle1" color="white">
                            <small>by {author}</small>
                        </Typography>

                    </CardContent>

                </div>

                <div>
                    <Link to={RoutePaths.RATE_AND_DISCOVER}><CloseIcon style={{ color: 'white'}}/></Link>
                </div>
            </Card>
            <div className="flex header">
                <small>{description}</small>
            </div>
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
                                    value={getRating(user, book_id) ? getRating(user, book_id) : stars}
                                    onChange={(event, newValue) => {
                                        setStars(newValue);
                                        setRating(user, book_id, newValue);
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
                <VennDiagram />
            </div>

        </div>

    );
}