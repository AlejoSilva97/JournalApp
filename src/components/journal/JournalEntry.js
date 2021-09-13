import React from 'react';
import moment from 'moment';
//import 'moment/locale/es';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, date, title, body, url}) => {

    //moment.locale('es');
    const noteDate = moment(date);

    const dispatch = useDispatch();

    const handleEntryClick = () => {

        const note = {
            title,
            body,
            url,
            date
        }

        dispatch( activeNote(id, note) );
    }

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeInLeft animate__faster"
            onClick={handleEntryClick}
        >
            
            {
                // Si la url existe mostrara la imagen, sino no mostrara nada
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('Do') }</h4>
            </div>

        </div>
    )
}
