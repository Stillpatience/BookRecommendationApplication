import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {Info} from "./Info";
import {Hello} from "./Hello";
import {Books} from "./Books";
import {Settings} from "./Settings";
import {RoutePaths} from "./RoutePaths";
import {Login} from "./Login";

export const Routes = () => {
    return (
        <Switch>
            <Route path={RoutePaths.LOGIN}>
                <Login />
            </Route>
            <Route path={RoutePaths.RATE_AND_DISCOVER}>
                <Settings />
            </Route>
            <Route path={RoutePaths.BOOKS}>
                <Books />
            </Route>
            <Route path={RoutePaths.SETTINGS}>
                <Settings />
            </Route>
        </Switch>);
};