import React from 'react'
import PropTypes from 'prop-types';
import './NotesSidebar.css'

const NotesSidebar = (props) => {
    return ( 
        <React.Fragment>
            <div className="noteNavBtnWrapper">
            <button className="noteNavBtn" onClick={props.goBack}>Go Back</button>
            </div>
            <h3 className="activeNoteFolder">{props.folder}</h3>
        </React.Fragment>
     );
}

NotesSidebar.defaultProps = {
    goBack : () => {},
    folder: ''
}

NotesSidebar.propTypes = {
    goBack : PropTypes.func.isRequired,
    folder : PropTypes.string.isRequired
}
 
export default NotesSidebar;