/*
    {
        notes: [],
        active: null o {
            id: '',
            title: '',
            body: '',
            imageUrl: '',
            date: 1212
        }
    }
*/

import { types } from '../types/types';

//Reducer de las notas
const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.notesActive:

            return {
                ...state,
                active:{
                    ...action.payload
                }
            }

        case types.notesLoad:

            return {
                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdated:

            return {
                ...state,
                notes: state.notes.map((note) => {
                    //Si el id de la nota en el areglo es igual a el id que viene en el payload se 
                    //remplaza por la nueva nota, de o contrario se deja como esta
                    if (note.id === action.payload.id) {
                        return action.payload.note;
                    }else{
                        return note;
                    }
                })
            }

        case types.notesDelete:

            return {
                ...state,
                active: null,
                notes: state.notes.filter((note) => note.id !== action.payload)
            }
            
        case types.notesLogoutCleaning:

            return {
                ...initialState
            }
            
        case types.notesAddNew:

            return {
                ...state,
                notes: [...state.notes, action.payload]
            }
    
        default:
            return state;
    }

}