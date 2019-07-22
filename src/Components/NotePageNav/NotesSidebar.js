import React from 'react'
import PropTypes from 'prop-types';
import './NotesSidebar.css';
import { NotefulContext } from '../NotefulContext';

const NotesSidebar = (props) => {

    const findNoteFolder = (noteId, folders, notes) => {
        console.log(noteId, notes, folders);
        const folderId = notes.find(note => note.id === noteId);
        return folders.find(folder => folder.id === folderId);
    }
    const noteId = props.match.params.noteid;
    return (
        <NotefulContext.Consumer>
            {({ folders, notes }) => (
                <React.Fragment>
                    <div className="noteNavBtnWrapper">
                        <button className="noteNavBtn" onClick={props.history.goBack}>Go Back</button>
                    </div>
                    <h3 className="activeNoteFolder">{console.log(findNoteFolder(noteId, folders, notes))}</h3>
                </React.Fragment>
            )}
        </NotefulContext.Consumer>
    );
}

NotesSidebar.defaultProps = {
    goBack: () => { },
    folder: ''
}

NotesSidebar.propTypes = {
    goBack: PropTypes.func.isRequired,
    folder: PropTypes.string.isRequired
}

export default NotesSidebar;