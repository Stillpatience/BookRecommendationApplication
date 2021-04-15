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
import {InitializationBooks} from "./InitializationBooks";
import {Genres} from "./Genres";


export const Routes = () => {
    const genreStatesMap = {}
    Genres.forEach(genre =>{
        genreStatesMap[genre] = false
    })
    const [genreStates, setGenreState] = React.useState(genreStatesMap);

    const handleGenreChange = (event) => {
        setGenreState({ ...genreStates, [event.target.name]: event.target.checked })
    }

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
                <Settings genreStates={genreStates} handleGenreChange={handleGenreChange}/>
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
            </Route>
            <Route path={RoutePaths.SETUP}>
                <SetUp />
            </Route>
            <Route path={RoutePaths.INITIALIZATION_BOOKS}>
                <InitializationBooks />
            </Route>
            <Redirect to={RoutePaths.LOGIN} />
        </Switch>);
};