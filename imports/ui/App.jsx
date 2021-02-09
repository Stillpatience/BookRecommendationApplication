import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {AppNavigation} from "./AppNavigation";
import {Route, Switch} from "react-router-dom";
import {Routes} from "./Routes";

export const App = () => (

    <div>
        <h1>Welcome to Meteor!</h1>
        <AppNavigation />
    </div>

);
