import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Genres} from './Genres'
import {useStyles} from "./styles";


export const Settings = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Stop receiving recommendations for following genres: </FormLabel>
                <FormGroup>
                    {Genres.map(genre =>
                    <FormControlLabel
                        control={<Checkbox checked={props.genreStates[genre]}
                                           onChange={props.handleGenreChange}
                                           color="primary"
                                           name={genre}/>}
                        label={genre}
                    />)}
                </FormGroup>
            </FormControl>
        </div>
    );
}