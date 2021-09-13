import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeletingNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

    const {active} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(active);
    const {title, body, id} = formValues;

    const dispatch = useDispatch();

    //De esta forma obtenemos el id de la nota activa
    const activeId = useRef(active.id);

    //Este efecto se disparara cada que cambie la nota
    useEffect(() => {
        //Si el id de la nota activa es diferente a el id de la nota que esta grabada inicialmente con useRef,
        //entonces se resetea el formulario
        if (active.id !== activeId.current) {
            reset(active);
            //y grabamos el nuevo id actual
            activeId.current = active.id;
        }

    }, [active, reset]);

    //Este efecto se dispara cada que cambian los valores de el formulario.
    useEffect(() => {
        //Hacemos dispatch de la accion activeNote con los valores que estamos cambiando en el formulario 
        //para cambiar la nota activa con esos valores
        dispatch( activeNote( formValues.id, {...formValues} ) );

    }, [formValues, dispatch]);

    const handleDelete = () => {
        dispatch(startDeletingNote(id));
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    name="body"
                    className="notes__textarea"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    (active.url) &&
                    <div className="notes__image">
                        <img 
                            src={active.url}
                            alt="imagen"
                        />
                    </div>
                }


            </div>

            <button 
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>

        </div>
    )
}
