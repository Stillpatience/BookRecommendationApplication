import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import {Routes} from "./Routes";
import {RoutePaths} from "./RoutePaths";

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
                    <BottomNavigationAction label="Rate and discover" icon={<Link to={RoutePaths.RATE_AND_DISCOVER}> <FavoriteIcon/> </Link>}/>
                    <BottomNavigationAction label="My books" icon={<Link to={RoutePaths.BOOKS}><MenuBookIcon/></Link>}/>
                    <BottomNavigationAction label="Profile settings" icon={<Link to={RoutePaths.SETTINGS}><AccountCircleIcon/></Link>}/>
                </BottomNavigation>
            </Router>

        </div>

    );
}