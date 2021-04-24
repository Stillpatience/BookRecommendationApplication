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
import {getShortTitle, wantToReadBooks} from "./Books";
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
import {Card, CardContent, CardMedia, InputLabel, MenuItem, Select, Snackbar} from "@material-ui/core";
import BarChart from "./BarChart";
import OtherBookExplanation from "./OtherBookExplanation";
import VennDiagram from "./VennDiagram";
import DoubleBarChart from "./DoubleBarChart";
import ArrowsExplanation from "./ArrowsExplanation";
import Baseline from "./Baseline";
import {useStyles} from "./styles";
import {Alert} from "@material-ui/lab";

const showFullDescription = () => {
    const fullDescription = document.getElementById("full-description");
    fullDescription.style.display = "block"
    const shortDescription = document.getElementById("short-description");
    shortDescription.style.display = "none"

}

const showShortDescription = () => {
    const fullDescription = document.getElementById("short-description");
    fullDescription.style.display = "block"
    const shortDescription = document.getElementById("full-description");
    shortDescription.style.display = "none"

}

export const Book = () => {

    const classes = useStyles();

    const user = 1;

    const [stars, setStars] = React.useState(0);
    const [addedStarsOpen, setStarsOpen] = React.useState(false);
    const [removedStarsOpen, setRemovedStarsOpen] = React.useState(false);


    const [addedOpenWantToRead, setAddedOpenWantToRead] = React.useState(false);
    const [removedOpenWantToRead, setRemovedOpenWantToRead] = React.useState(false);

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
    let short_description;
    if (typeof full_description == 'undefined'){
        full_description = "No description found.";
        short_description = full_description
    }
    else {
        short_description = full_description.substring(0,200)
    }

    const handleWantToReadClick = () => {
        if (wantToRead){
            setAddedOpenWantToRead(true);
            const snackbar = document.getElementById("added-to-my-books-snackbar");
            snackbar.style.display = "block";
            wantToReadBooks.push(isbn);
        }
        else{
            setRemovedOpenWantToRead(true);
            const snackbar = document.getElementById("removed-from-my-books-snackbar");
            snackbar.style.display = "block";
            removeItemOnce(wantToReadBooks, isbn);
        }
        setWantToRead(!wantToRead);

    };

    const handleNumberClick = (number) => {
        const div = document.getElementById("visualizations-div");
        div.style.marginBottom = "0";
        for (let key in visualizationsMap) {
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

    const handleAddedClose = () => {
        setAddedOpenWantToRead(false);
        const snackbar = document.getElementById("added-to-my-books-snackbar");
        snackbar.style.display = "none";
    }

    const handleRemovedClose = () => {
        setRemovedOpenWantToRead(false);
        const snackbar = document.getElementById("removed-from-my-books-snackbar");
        snackbar.style.display = "none";
    }

    const handleAddedRating = () => {
        setStarsOpen(false);
        const snackbar = document.getElementById("added-star-rating");
        snackbar.style.display = "none";
    }

    const handleRemovedRating = () => {
        setRemovedStarsOpen(false);
        const snackbar = document.getElementById("removed-star-rating");
        snackbar.style.display = "none";
    }

    const handleChange = (event) => {
        handleNumberClick(event.target.value)
    }
    const authors = book["authors"];
    let res = authors.split(" ");
    const author = res[0] + " " + res[1];
    const book_id = book["id"];
    return (
        <div>
            <Card >
                <div className={classes.flex_header} style={{backgroundColor: "rgb(98, 2, 238)", color: 'white'}}>
                    <div className={classes.right}>
                    <CardMedia
                        title={getShortTitle(book)}
                    />
                        <img src={"/" + book["id"] + ".jpg"} height="150" alt="Loading"/>
                    <CardMedia />
                    </div>
                    <div className= {classes.left}>
                        <CardContent>
                            <Typography variant="h6" color="white">
                                {getShortTitle(book)}
                            </Typography>
                            <br/>
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
                <div className={classes.flex_header} style={{backgroundColor: "rgb(98, 2, 238)", color: 'white'}}>
                    {short_description === full_description ?
                        <Typography variant="subtitle2" color="white" id="short-description" style={{display :"block"}}>
                            <small>
                                {short_description}
                            </small>
                        </Typography> :
                        <Typography variant="subtitle2" color="white" id="short-description" style={{display :"block"}}>
                            <small>
                            {short_description} {"("} <a style={{cursor :"pointer", textDecoration :"underline"}}
                                                   onClick={showFullDescription}>more</a> {")"}
                            </small>
                        </Typography>}
                    <Typography variant="subtitle2" color="white" id="full-description" style={{display :"none"}}>
                        <small>
                            {full_description} {"("} <a style={{cursor :"pointer", textDecoration :"underline"}}
                                                                            onClick={showShortDescription}>show less</a> {")"}
                        </small>
                    </Typography>
                </div>
            </Card>

            <div id="visualizations-div" style={{"margin-bottom": "4rem"}}>
                <Grid container>
                    <Grid item xs={6} align='left'>
                        <Typography variant="body2" color="textSecondary"  display="inline">
                            Average rating
                            <Box component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="read-only" value={book["average_rating"]} readOnly />
                            </Box>

                        </Typography>
                    </Grid>
                    <Grid item xs align='right'>
                        <Typography variant="body2" color="textSecondary" >
                            Based on  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;
                            <p>{numberWithCommas(parseInt(book["ratings_count"]))} ratings</p>
                        </Typography>
                    </Grid>
                </Grid>
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
                                        if (newValue !== null){
                                            setStarsOpen(true);
                                            const snackbar = document.getElementById("added-star-rating");
                                            snackbar.style.display = "block";
                                        } else {
                                            setRemovedStarsOpen(true);
                                            const snackbar = document.getElementById("removed-star-rating");
                                            snackbar.style.display = "block";

                                        }

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
                        <Button variant="contained" color={wantToRead ? "primary" : "inherit"} onClick={handleWantToReadClick}>
                            Want to read
                        </Button>
                    </Grid>
                </Grid>
                <Typography variant="h5"> Why am I seeing this?</Typography>
                <BarChart book_id={book_id}/>
                <VennDiagram book_id={book_id}/>
                <OtherBookExplanation book_id={book_id}/>
                <DoubleBarChart book_id={book_id}/>
                <ArrowsExplanation book_id={book_id}/>
                <Baseline book_id={book_id}/>
                <InputLabel id="demo-simple-select-label">Visualization</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                    <MenuItem value={4}>Four</MenuItem>
                    <MenuItem value={5}>Five</MenuItem>
                    <MenuItem value={6}>Six</MenuItem>
                </Select>
                <div id="added-to-my-books-snackbar" style={{display :"none"}}>
                    <Snackbar open={addedOpenWantToRead} autoHideDuration={2000} onClose={handleAddedClose}>
                        <Alert onClose={handleAddedClose} severity="success">
                            Added to My Books!
                        </Alert>
                    </Snackbar>
                </div>
                <div id="removed-from-my-books-snackbar" style={{display :"none"}}>
                    <Snackbar open={removedOpenWantToRead} autoHideDuration={2000} onClose={handleRemovedClose}>
                        <Alert onClose={handleRemovedClose} severity="info">
                            Removed from My Books!
                        </Alert>
                    </Snackbar>
                </div>
                <div id="added-star-rating" style={{display :"none"}}>
                    <Snackbar open={addedStarsOpen} autoHideDuration={2000} onClose={handleAddedRating}>
                        <Alert onClose={handleAddedRating} severity="success">
                            Added rating!
                        </Alert>
                    </Snackbar>
                </div>
                <div id="removed-star-rating" style={{display :"none"}}>
                    <Snackbar open={removedStarsOpen} autoHideDuration={2000} onClose={handleRemovedRating}>
                        <Alert onClose={handleRemovedRating} severity="info">
                            Removed rating!
                        </Alert>
                    </Snackbar>
                </div>
            </div>

        </div>

    );
}