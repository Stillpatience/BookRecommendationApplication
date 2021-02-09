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
import {AppNavigation} from "./AppNavigation";
import {Settings} from "./Settings";

export const Routes = () => {
    return (
        <Switch>
            <Route path="/rate-and-discover">
                <Books />
            </Route>
            <Route path="/books">
                <Books />
            </Route>
            <Route path="/settings">
                <Settings />
            </Route>
            <Route path="/">
                <Hello />
            </Route>
        </Switch>);
};