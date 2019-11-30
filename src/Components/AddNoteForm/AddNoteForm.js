import React, { useContext } from 'react';
import { NotefulContext } from '../NotefulContext';
import './AddNoteForm.css';

const AddNoteForm = (props) => {
    const value = useContext(NotefulContext);
    return (
        <form onSubmit={value.createNote} className='addNoteForm'>
            <label htmlFor='newNoteName'>New Note Name</label>
            <input type='text' id='newNoteName' value={value.newNoteName} name='newNoteName' onChange={value.updateNote} required />
            <label htmlFor='newNoteContent'>Content</label>
            <textarea id='newNoteContent' name='newNoteContent' value={value.newNoteContent} onChange={value.updateNote} required></textarea>
            <label htmlFor='newNoteFolderId'>Folder</label>
            <select id="newNoteFolderId" name="newNoteFolderId" value={value.newNoteFolderId} onChange={value.updateNote} required>
                {value.folders.map(folder => (<option key={folder.id} value={folder.id}>{folder.name}</option>))}
            </select>
            <button>Create Note</button>
        </form>
    );
}

export default AddNoteForm;