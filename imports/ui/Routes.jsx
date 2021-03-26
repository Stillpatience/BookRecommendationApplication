import React from 'react';
import {
    Switch,
    Route,
    Redirect
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
import {AppNavigation} from "./AppNavigation";


export const Routes = () => {
    return (
        <Switch>
            <Route path={RoutePaths.LOGIN}>
                <Login />
            </Route>
            <Route path={RoutePaths.RATE_AND_DISCOVER}>
                <Books />
                <AppNavigation />
            </Route>
            <Route path={RoutePaths.BOOKS}>
                <MyBooks />
                <AppNavigation />
            </Route>
            <Route path={RoutePaths.SETTINGS}>
                <Settings />
                <AppNavigation />
            </Route>
            <Route path={RoutePaths.BOOK + "/:id"}>
                <Book />
                <AppNavigation />
            </Route>
            <Route path={RoutePaths.REGISTER}>
                <Register />
            </Route>
            <Route path={RoutePaths.TERMS_AND_CONDITIONS}>
                <TermsAndConditions />
                <AppNavigation />
            </Route>
            <Route path={RoutePaths.SETUP}>
                <SetUp />
            </Route>
            <Redirect to={RoutePaths.LOGIN} />
        </Switch>);
};