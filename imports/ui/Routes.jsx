import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import {Books} from "./Books";
import {Book} from "./Book";

import {Settings} from "./Settings";
import {RoutePaths} from "./RoutePaths";
import {Login} from "./Login";
import {MyBooks} from "./MyBooks";

export const Routes = () => {
    return (
        <Switch>
            <Route path={RoutePaths.LOGIN}>
                <Login />
            </Route>
            <Route path={RoutePaths.RATE_AND_DISCOVER}>
                <Books />
            </Route>
            <Route path={RoutePaths.BOOKS}>
                <MyBooks />
            </Route>
            <Route path={RoutePaths.SETTINGS}>
                <Settings />
            </Route>
            <Route path={RoutePaths.BOOK + "/:id"}>
                <Book />
            </Route>
        </Switch>);
};