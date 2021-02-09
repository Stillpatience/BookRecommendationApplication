import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export const Settings = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        horror: false,
        romance: false,
        drama: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const { horror, romance, drama } = state;

    return (
        <center>
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Stop receiving recommendation of following genres: </FormLabel>
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
                </FormGroup>
                <FormHelperText>Be careful</FormHelperText>
            </FormControl>
        </div>
        </center>
    );
}