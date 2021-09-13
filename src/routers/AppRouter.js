import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { firebase } from "../firebase/firebase-config";
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    //Este checking lo usamos para asegurarnos de que ya termino de verificar la autenticacion
    const [checking, setchecking] = useState(true);

    //Este islogged lo usamos para saber si hay un usuario logueado
    const [isLogged, setisLogged] = useState(false);

    useEffect(() => {
        
        //se dispara cada que cambia el estado de la autenticacion
        firebase.auth().onAuthStateChanged( async(user) => {
            
            //Si user no esta en null y hay un uid quiere decir que hay un usuario autenticado en firebase
            if (user?.uid) {
                dispatch( login(user.uid, user.displayName) );
                setisLogged(true);

                dispatch( startLoadingNotes(user.uid) );
            }else{
                setisLogged(false);
            }

            setchecking(false);

        });

    }, [dispatch, setchecking, setisLogged]);

    //Mientras checkeamos si hay usuario logueado en firebase mostramos "Please wait..." en vez de nuestra App
    if (checking) {
        return(
            <h1>Please wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        isAuth={isLogged}
                        component={ AuthRouter }
                        path="/auth"
                    />

                    <PrivateRoute 
                        isAuth={isLogged}
                        component={ JournalScreen }
                        path="/"
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
