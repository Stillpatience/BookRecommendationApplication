import React from "react";
import {RoutePaths} from "./RoutePaths";
import {BooksCollection, GenresCollection} from "../api/links";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import {wantToReadBooks} from "./Books";
import {
    addGenres,
    getRating,
    previouslyLikedBooks,
    propagatedIDs,
    removeItemOnce,
    setRating,
    visualizationsMap
} from "../utils/utils"
import {numberWithCommas} from "../utils/utils"
import {Card, CardContent, CardMedia} from "@material-ui/core";
import BarChart from "./BarChart";
import OtherBookExplanation from "./OtherBookExplanation";
import VennDiagram from "./VennDiagram";
import DoubleBarChart from "./DoubleBarChart";
import ArrowsExplanation from "./ArrowsExplanation";
import Baseline from "./Baseline";

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

    let full_description = book["description"];
    let short_description = "";
    if (typeof full_description == 'undefined'){
        full_description = "No description found.";
    }
    else {
        short_description = full_description.substring(0,100) + '...'
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

    const handleNumberClick = (number) => {
        for (let key in visualizationsMap) {
            // check if the property/key is defined in the object itself, not in parent
            if (visualizationsMap.hasOwnProperty(key)) {
                const node = document.getElementById(visualizationsMap[key]);
                if (parseInt(key) !== parseInt(number)){
                    node.style.display = "none";
                } else{
                    node.style.display = "block";

                }
            }
        }
    }
    const authors = book["authors"];
    let res = authors.split(" ");
    const author = res[0] + " " + res[1];
    const book_id = book["id"];
    const book_img = book["id"] + ".jpg"
    return (
        <div>
            <Card >
                <div className="flex header">
                    <div className="right">
                    <CardMedia
                        title={book["title"]}
                    />
                        <img src={"/" + book["id"] + ".jpg"} height="150" alt="Loading"/>
                    <CardMedia />
                    </div>
                    <div className= "flex header left">
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
                </div>
            </Card>
            <div className="flex header">
                <small>{short_description}</small>
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
                    <Grid item xs align='right'>
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
                                    value={getRating(user, book_id) && !propagatedIDs.includes(book_id) ?
                                        getRating(user, book_id) : stars}
                                    onChange={(event, newValue) => {
                                        setStars(newValue);
                                        if (newValue > 2){
                                            previouslyLikedBooks.push(book_id)
                                        }
                                        setRating(user, book_id, newValue, false);
                                        let genres = GenresCollection.find({"id":book_id}, {}).fetch();
                                        addGenres(book_id, genres)
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
                <BarChart book_id={book_id}/>
                <VennDiagram book_id={book_id}/>
                <OtherBookExplanation book_id={book_id}/>
                <DoubleBarChart book_id={book_id}/>
                <ArrowsExplanation book_id={book_id}/>
                <Baseline book_id={book_id}/>
                <Button variant="contained" color="primary" onClick={() => { handleNumberClick(1) }}>
                    1
                </Button>
                <Button variant="contained" color="primary" onClick={() => { handleNumberClick(2) }}>
                    2
                </Button>
                <Button variant="contained" color="primary" onClick={() => { handleNumberClick(3) }}>
                    3
                </Button>
                <Button variant="contained" color="primary" onClick={() => { handleNumberClick(4) }}>
                    4
                </Button>
                <Button variant="contained" color="primary" onClick={() => { handleNumberClick(5) }}>
                    5
                </Button>
                <Button variant="contained" color="primary" onClick={() => { handleNumberClick(6) }}>
                    6
                </Button>
            </div>
        </div>

    );
}