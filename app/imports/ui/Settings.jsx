import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Genres} from './Genres'
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export const Settings = (props) => {

    const handleClose = () => {
        setOpen(false);
        const snackbar = document.getElementById("settings-snackbar");
        snackbar.style.display = "none";
    }

    const handleClick = () => {
        setOpen(true);
        const snackbar = document.getElementById("settings-snackbar");
        snackbar.style.display = "block"
    }
    const [open, setOpen] = React.useState(false);
    return (
        <div >
            <FormControl component="fieldset">
                <FormLabel component="legend">Stop receiving recommendations for following genres: </FormLabel>
                <FormGroup>
                    {Genres.map(genre =>
                    <FormControlLabel
                        control={<Checkbox checked={props.genreStates[genre]}
                                           onChange={props.handleGenreChange}
                                           onClick={handleClick}
                                           color="primary"
                                           name={genre}/>}
                        label={genre}
                    />)}
                    <div id="settings-snackbar" style={{display :"none"}}>
                        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                Updated preferences!
                            </Alert>
                        </Snackbar>
                    </div>
                </FormGroup>
            </FormControl>
        </div>
    );
}