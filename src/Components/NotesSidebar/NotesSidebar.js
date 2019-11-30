import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { NotefulContext } from '../NotefulContext';
import './NotesSidebar.css'

const NotesSidebar = (props) => {
    let history = useHistory();
    const value = useContext(NotefulContext);
    const handleGoBack = () => {
        history.goBack();
    }

    useEffect(() => {
        value.getCurrentNote(props.match.params.noteid)
    }, [])

    return (

        < React.Fragment >
            <div className="noteNavBtnWrapper">
                <button className="noteNavBtn" onClick={handleGoBack}>Go Back</button>
            </div>
            <h3 className="activeNoteFolder">{value.folderName.name}</h3>
        </React.Fragment >
    );
}

NotesSidebar.defaultProps = {
    folder: ''
}

export default NotesSidebar;