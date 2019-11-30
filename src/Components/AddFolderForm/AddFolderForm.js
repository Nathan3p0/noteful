import React, { useContext } from 'react';
import { NotefulContext } from '../NotefulContext'
import './AddFolderForm.css'

const AddFolderForm = (props) => {
    const value = useContext(NotefulContext);
    return (
        <form onSubmit={value.createFolder} className='addFolderForm'>
            <label htmlFor='newFolderName'>New Folder Name</label>
            <input type='text' id='newFolderName' name="newFolderName" value={value.newFolderName} onChange={value.updateFolder} required />
            <button>Create Folder</button>
        </form>

    );
}

export default AddFolderForm;