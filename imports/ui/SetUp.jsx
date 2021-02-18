import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import {useStyles} from "./styles";
import {Alert} from "@material-ui/lab";
import {InitializationBooks} from "./InitializationBooks";

export const SetUp = () => {
    const classes = useStyles();
    return <Grid item xs={12}>

        <Paper className={classes.header}><Alert severity="success">Account created successfully!</Alert>
            <br/> To understand your preferences, please select books that you like</Paper>
        <InitializationBooks />
    </Grid>;
}
