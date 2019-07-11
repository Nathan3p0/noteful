import React from 'react';
import { NotefulContext } from './NotefulContext'

const AddNote = (props) => {

    return ( 
        <NotefulContext.Consumer>
            {({createNote, newNoteName, updateNote, newNoteContent, newNoteFolderId, folders }) => (
        <form onSubmit={e => createNote(e)}>
            <label htmlFor='newNoteName'>New Note Name</label>
            <input type='text' id='newNoteName' value={newNoteName} name='newNoteName' onChange={event => updateNote(event)}  required/>
            <label htmlFor='newNoteContent'>Content</label>
            <textarea id='newNoteContent' name='newNoteContent' value={newNoteContent}  onChange={event => updateNote(event)}  ></textarea>
            <label htmlFor='newNoteFolderId'>Folder</label>
            <select id="newNoteFolderId" name="newNoteFolderId" value={newNoteFolderId} onChange={event => updateNote(event)} >
                {folders.map(folder => (<option key={folder.id} value={folder.id}>{folder.name}</option>))}
            </select>
            <button>Create Note</button>
        </form>
            )}
        </NotefulContext.Consumer>
    );
}

export default AddNote;