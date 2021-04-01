import React from 'react';

import {AppNavigation} from "./AppNavigation";
import {Routes} from "./Routes";
import {BrowserRouter as Router} from "react-router-dom";

import {RoutePaths} from "./RoutePaths";

export const App = () => (

    <div>
        <Router>
            <Routes />
        </Router>
    </div>

);
