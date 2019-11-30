import React from 'react';
import { Link } from 'react-router-dom';
import DeleteNoteButton from '../DeleteNoteButton/DeleteNoteButton';
import PropTypes from 'prop-types';
import './NotesListItem.css'

const NotesListItem = (props) => {

    return (
        <li className="noteItem">
            <h2><Link to={`/note/${props.id}`}>{props.name}</Link></h2>
            <span className="noteDate">Date Created on {new Date(props.created).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            <DeleteNoteButton noteId={props.id} />
        </li>
    )
}

NotesListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    created: PropTypes.string
}

NotesListItem.defaultProps = {
    id: 0,
    name: '',
    created: ''
}

export default NotesListItem;