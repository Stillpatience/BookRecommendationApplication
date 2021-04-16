import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import {
    Link,
    useHistory
} from "react-router-dom";
import {RoutePaths} from "./RoutePaths";
import {useStyles} from "./styles";

export const AppNavigation = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    return(
        <div id="navigation">
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                fullWidth
                className={classes.bottom_fixed}
            >
                <BottomNavigationAction component={Link} onClick={() => history.push(RoutePaths.RATE_AND_DISCOVER)}
                                        label="Home" icon={<HomeIcon/>}/>

                <BottomNavigationAction component={Link} to={RoutePaths.BOOKS}
                                        label="My books" icon={<MenuBookIcon/>}/>
                <BottomNavigationAction component={Link} to={RoutePaths.SETTINGS}
                                        label="Profile" icon={<AccountCircleIcon/>}/>

            </BottomNavigation>
        </div>

    );
}