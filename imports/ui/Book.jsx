import React from "react";
import {RoutePaths} from "./RoutePaths";
import {BooksCollection} from "../api/links";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import CloseIcon from '@material-ui/icons/Close';
import {Link} from "react-router-dom";
import StarBorderIcon from '@material-ui/icons/StarBorder';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
        "background-color": 'rgb(98, 2, 238)',
        color: 'white',
    },
    explanation: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export const Book = () => {
    const classes = useStyles();

    const url = window.location.href
    const isbn = url.substring(url.indexOf(RoutePaths.BOOK) + RoutePaths.BOOK.length + 1, url.length);
    const book = BooksCollection.findOne({isbn: parseInt(isbn)});
    let description = book["description"];
    console.log("description");

    console.log(description);

    if (typeof description == 'undefined'){
        description = "No description found.";
    }
    else {
        description = description.substring(0,100) + '...'
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.header}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} id={book["isbn"]} src={book["image_url"]} width="98" height="146" alt="Unable to load image" />
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
            <div className={classes.explanation}>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary"  display="inline">
                            <StarBorderIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/><StarBorderIcon/>
                            {book["average_rating"]}
                        </Typography>
                    </Grid>

                    <Grid item xs  >
                        <Typography variant="body2" color="textSecondary">
                            {numberWithCommas(parseInt(book["ratings_count"]))} ratings
                        </Typography>
                    </Grid>
                </Grid>
            </div>

        </div>

    );
}