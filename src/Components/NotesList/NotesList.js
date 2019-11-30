import React, { useContext } from 'react';
import NotesListItem from '../NotesListItem/NotesListItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { NotefulContext } from '../NotefulContext';
import './NotesList.css';

const NotesList = (props) => {
  const value = useContext(NotefulContext);
  const notesFiltered = value.notes.map((note) => {
    if (parseInt(props.match.params.folderid) === note.folder_id) {
      return <NotesListItem key={note.id} id={note.id} name={note.name} created={note.created} />
    } else {
      return null;
    }
  })

  const notes = value.notes.map(note =>
    <NotesListItem key={note.id} id={note.id} name={note.name} created={note.created} />
  )

  return (
    <section className="notesList">
      <ul>
        {props.match.path === '/' ? notes : notesFiltered}
      </ul>
      <div className="mainBtnWrapper">
        <button className="btn btnAddNote"><Link to='/addnote'>Add Note</Link></button>
      </div>
    </section>
  );
}

NotesList.defaultProps = {
  notes: []
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired
}

export default NotesList;