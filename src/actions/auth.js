import Swal from 'sweetalert2';

//importamos nuestra configuracion de la app de firebase.
import {firebase, googleAuthProvider} from '../firebase/firebase-config';
import { types } from "../types/types";
import { cleanNotes } from './notes';
import { finishLoading, startLoading } from './ui';


//Accion asincrona que loguea en mi app de firebase un usuario con email y password. Metodos firebase auth()
//y llama a nuestra accion login o dispara el error.
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

        dispatch( startLoading() );
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCred) => {

                const {user} = userCred;
                dispatch( login(user.uid, user.displayName) );
                dispatch( finishLoading() );

            })
            .catch((e) => {
                console.log(e);
                dispatch( finishLoading() );
                Swal.fire('Error', e.message, 'error');
            });

    }
}

//Accion asincrona que registra un usuario con email, password y name en mi app de firebase. Metodos firebase auth()
//y llama a nuestra accion login o dispara el error.
export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async(userCred)=> {

                const {user} =userCred;

                //al crear el usuario este se crea sin displayName, asi se lo asignamos
                await user.updateProfile({
                    displayName: name
                });
                
                dispatch( login(user.uid, user.displayName) );
            })
            .catch((e) => {
                console.log(e);
                Swal.fire('Error', e.message, 'error');
            });
    }
}

//Accion asincrona que loguea en mi app de firebase un usuario con una cuenta existente de google.
//y llama a nuestra accion login.
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then((userCred)=> {

                const {user} =userCred;
                dispatch( login(user.uid, user.displayName) );
            });
    }
}

//Accion sincrona que realiza el logueo en nuestra app de react, en este caso es llamada por las acciones asincronas.
//De esta forma hacemos un return pero de forma implicita
export const login = (uid, displayName) => ({
    type: types.login,
    payload:{
        uid: uid,
        displayName: displayName
    }
});

//Accion asincrona que realiza el logout de nuestra app de firebase, y llama a nuestra accion logout
export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();

        dispatch( cleanNotes() );
        dispatch( logout() );
    }
}

//Accion sincrona que realiza el logout de nuestra app de react.
export const logout = () => ({
    type: types.logout
});
    
