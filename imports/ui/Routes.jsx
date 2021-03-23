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
import {Register} from "./Register";
import {TermsAndConditions} from "./TermsAndConditions";
import {SetUp} from "./SetUp";


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
            <Route path={RoutePaths.REGISTER}>
                <Register />
            </Route>
            <Route path={RoutePaths.TERMS_AND_CONDITIONS}>
                <TermsAndConditions />
            </Route>
            <Route path={RoutePaths.SETUP}>
                <SetUp />
            </Route>
            <Route path={RoutePaths.HOME}>
                <Login />
            </Route>
        </Switch>);
};