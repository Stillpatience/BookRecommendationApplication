import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Hello} from "./Hello";
import {Info} from "./Info";
import {Books} from "./Books";
import {Routes} from "./Routes";

const useStyles = makeStyles({
    root: {
        width: "100vw",
    },
});

export const AppNavigation = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return(
        <div>
            <Router>
                <Routes />

                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                >
                    <Link to={'/rate-and-discover'}> <BottomNavigationAction label="Rate and discover" icon={<FavoriteIcon/>}/> </Link>
                    <Link to={'/books'}> <BottomNavigationAction label="My books" icon={<MenuBookIcon/>}/> </Link>
                    <Link to={'/settings'}> <BottomNavigationAction label="Profile settings" icon={<AccountCircleIcon/>}/> </Link>
                </BottomNavigation>
            </Router>

        </div>

    );
}