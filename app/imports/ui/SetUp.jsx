import React from 'react';
import {Paper} from "@material-ui/core";
import {useStyles} from "./styles";
import {Alert} from "@material-ui/lab";
import {RoutePaths} from "./RoutePaths";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export const SetUp = () => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.header}>
                <Alert severity="success">Account created successfully!</Alert>
                <br/> To understand your preferences, we will ask you to select some books that you like in the following screen.
                You can select as many or as little books as you want.
            </Paper>
            <br/>
            <div className={classes.center}>
            <img src={"./app-icon.jpg"} width={document.documentElement.clientWidth / 2}
                 height={document.documentElement.clientHeight / 3} alt={"app-icon"}/>
            </div>
            <div>
                <Link to={RoutePaths.INITIALIZATION_BOOKS}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Continue
                    </Button>
                </Link>
            </div>
        </div>);
}
