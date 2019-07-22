import React from 'react'
import PropTypes from 'prop-types';
import './NotesSidebar.css';
import { NotefulContext } from '../NotefulContext';

const NotesSidebar = (props) => {
    return (
        <NotefulContext.Consumer>
            {({ findNote, folders }) => (
                <React.Fragment>
                    <div className="noteNavBtnWrapper">
                        <button className="noteNavBtn" onClick={props.history.goBack}>Go Back</button>
                    </div>
                    <h3 className="activeNoteFolder">{props.folder}</h3>
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