import React from 'react';
import { Link } from 'react-router-dom';
import DeleteNoteButton from '../DeleteNoteButton/DeleteNoteButton';
import PropTypes from 'prop-types';
import './NoteItem.css'

const NoteItem = (props) => {
    
    return ( 
            <li className="noteItem">
                <h2><Link to={`/note/${props.id}`}>{props.name}</Link></h2>
                <span className="noteDate">Date Modified on {new Date(props.modified).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'  })}</span>
                <DeleteNoteButton noteId={props.id} />
            </li>
     );
}

NoteItem.propTypes = {
    id : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired,
    modified : PropTypes.string
}

NoteItem.defaultProps = {
    id : '',
    name : '',
    modified: ''
}
 
export default NoteItem;