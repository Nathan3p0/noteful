import React, { useState, useEffect } from 'react';
import NotesListItem from '../NotesListItem/NotesListItem';
import NotesApiService from '../../services/notes-api-service';
import './SingleNote.css'

const SingleNote = (props) => {
  const [note, setNote] = useState({});
  const [error, setError] = useState({});
  const fetchSingleNote = (noteId) => {
    NotesApiService.fetchSingleNote(noteId)
      .then(responseJson => {
        setNote(responseJson)
      })
      .catch(error => {
        setError({
          error: error.message
        })
      })
  }

  useEffect(() => {
    fetchSingleNote(props.note)
  }, [])

  return (
    <section className="indNote">
      <ul>
        <NotesListItem id={note.id} name={note.name} created={note.created} />
      </ul>
      <p className="noteContent">{note.content}</p>
    </section>
  );
}

SingleNote.defaultProps = {
  note: {
    id: 0,
    name: '',
    created: '',
    content: ''
  }
}

export default SingleNote;