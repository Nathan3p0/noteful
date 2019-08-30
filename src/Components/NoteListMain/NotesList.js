import React from 'react';
import NoteItem from '../Note/NoteItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NotesList.css';

const NotesList = (props) => {

  const notes = props.notes.map((note) => (
    <NoteItem key={note.id} id={note.id} name={note.name} created={note.created} />
  ))

    return ( 
        <section className="notesList">
          <ul>
            {notes}
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
  notes : PropTypes.array.isRequired
}
 
export default NotesList;