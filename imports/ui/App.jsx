import React from 'react';

import {AppNavigation} from "./AppNavigation";
import {Routes} from "./Routes";
import {BrowserRouter as Router} from "react-router-dom";


export const App = () => (

    <div>
        <Router>
            <Routes />
            <div id="navigation">
                <AppNavigation />
            </div>
        </Router>
    </div>

);
