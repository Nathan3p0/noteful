import React from 'react';
import FolderItem from '../NoteListNavItem/FolderItem';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './FolderListPrimary.css'

const FolderListPrimary = (props) => {
  
    const folder = props.folders.map((folder) => (
      <FolderItem key={folder.id} id={folder.id} name={folder.name} />
    ))
    return ( 
        <React.Fragment>
          <ul className="folderNavList">
            {folder}
          </ul>
          <div className="navBtnWrapper">
          <button><Link to="/addfolder">Add folder</Link></button>
          </div>
        </React.Fragment>
     );
}

FolderListPrimary.defaultProps = {
  folders: []
}

FolderListPrimary.propTypes = {
  folders : PropTypes.array.isRequired,
}
 
export default FolderListPrimary;