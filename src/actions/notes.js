import Swal from 'sweetalert2';

import { db } from "../firebase/firebase-config";
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';

export const startAddNewNote = () => {
    //el segundo argumento de este callback es una funcion que nos permite obtener toda la informacion de el state(store)
    return async(dispatch, getState) => {

        const {auth} = getState();

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        //De esta forma guardamos la nueva nota dentro de la bd en la coleccion de el usuario.
        const docRef =  await db.collection(`${auth.uid}/journal/notes`).add(newNote);

        dispatch( activeNote(docRef.id, newNote) );
        dispatch( addNewNote(docRef.id, newNote) ); 
    }
}

//Retorna implicitamente un objeto "ES6".
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async (dispatch) => {

        const notes = await loadNotes( uid );

        dispatch( setNotes(notes) );

    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
})

export const startSaveNote = (note) => {
    return async(dispatch, getState) => {

        const {auth} = getState();

        //Si la url no existe o esta indefinida la eliminamos de la nota
        if (!note.url) {
            delete note.url;
        }

        //creamos un clon de la nota pero le quitamos el id ya que eso no lo vamos a guardar por que ya lo tenemos.
        const noteToSave = {...note};
        delete noteToSave.id;

        //Se guarda el contenido de la nota en la ruta con id de la nota.
        await db.doc(`${auth.uid}/journal/notes/${note.id}`).update(noteToSave);

        dispatch( refreshNote(note.id, noteToSave) );
        Swal.fire('Saved Note', note.title, 'success');
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note:{
            id,
            ...note
        }
    }
})

export const startUploadingFile = (file) => {
    return async(dispatch, getState) => {
        const {notes} = getState();
        const {active} = notes;

        Swal.fire({
            title: 'Uploading...!',
            text: 'Please Wait...!',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload(file);
        active.url = fileUrl;

        dispatch( startSaveNote(active) );

        Swal.close();
    }
}

export const startDeletingNote = (noteId) => {
    return async(dispatch, getState) => {
        
        const {auth} = getState();
        const {uid} = auth;

        await db.doc(`${uid}/journal/notes/${noteId}`).delete();

        dispatch(deleteNote(noteId));
    }
}

export const deleteNote = (noteId) => ({

    type: types.notesDelete,
    payload: noteId

})

export const cleanNotes = () => ({

    type: types.notesLogoutCleaning

})