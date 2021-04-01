import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: '0px 50px 50px 50px'

    },
    formControl: {
        margin: 'auto',
    },
}));

export const Settings = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        horror: false,
        romance: false,
        drama: false,
        educational: false,
        thriller: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { horror, romance, drama, educational, thriller } = state;

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Stop receiving recommendations for following genres: </FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox checked={horror} onChange={handleChange} name="horror" />}
                        label="Horror"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={romance} onChange={handleChange} name="romance" />}
                        label="Romance"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={drama} onChange={handleChange} name="drama" />}
                        label="Drama"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={educational} onChange={handleChange} name="educational" />}
                        label="Educational"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={thriller} onChange={handleChange} name="thriller" />}
                        label="Thriller"
                    />
                </FormGroup>
            </FormControl>
        </div>
    );
}