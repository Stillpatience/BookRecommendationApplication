import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    Link,
    useHistory
} from "react-router-dom";
import {RoutePaths} from "./RoutePaths";

const useStyles = makeStyles({
    root: {
        width: "100vw",
    },
});

export const AppNavigation = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    return(
        <div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <Link onClick={() => history.push(RoutePaths.RATE_AND_DISCOVER)}>
                    <BottomNavigationAction label="Rate and discover" icon={ <FavoriteIcon/>}/>
                </Link>
                <Link to={RoutePaths.BOOKS}>
                    <BottomNavigationAction label="My books" icon={<MenuBookIcon/>}/>
                </Link>
                <Link to={RoutePaths.SETTINGS}>
                    <BottomNavigationAction label="Profile settings" icon={<AccountCircleIcon/>}/>
                </Link>
            </BottomNavigation>
        </div>

    );
}