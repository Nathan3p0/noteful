import React from 'react';
import { NotefulContext } from '../NotefulContext';
import './DeleteNoteButton.css'

const DeleteNoteButton = (props) => {
    return (
        <NotefulContext.Consumer>
            {({ deleteNote }) => (
                <button className="btn btnDelete" onClick={() => deleteNote(props.noteId)}>Delete Note</button>
            )}
        </NotefulContext.Consumer>
    );
}

DeleteNoteButton.defaultProps = {
    noteId: 0
}

export default DeleteNoteButton;