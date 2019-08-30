import React from 'react'
import NoteItem from '../Note/NoteItem'
import PropTypes from 'prop-types';
import './SingleNote.css'

const SingleNote = (props) => {
    return ( 
        <section className="indNote">
          <ul>
            <NoteItem id={props.note.id} name={props.note.name} created={props.note.created}  />
          </ul>
          <p className="noteContent">{props.note.content}</p>
        </section>
     );
}

SingleNote.propTypes = {
  note : PropTypes.object.isRequired
}

SingleNote.defaultProps = {
  note: {
    id : '',
    name : '',
    created : '',
    content: ''
  }
}

export default SingleNote;