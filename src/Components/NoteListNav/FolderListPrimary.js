import React from 'react';
import FolderItem from '../NoteListNavItem/FolderItem';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FolderListPrimary.css'
import { NotefulContext } from '../NotefulContext';

const FolderListPrimary = (props) => {
  return (
    <NotefulContext.Consumer>
      {({ folders }) => (
        <React.Fragment>
          <ul className="folderNavList">
            {
              folders.map(folder => (
                <FolderItem key={folder.id} id={folder.id} name={folder.name} />))
            }
          </ul>
          <div className="navBtnWrapper">
            <button><Link to="/addfolder">Add folder</Link></button>
          </div>
        </React.Fragment>
      )}

    </NotefulContext.Consumer>
  )
}

FolderListPrimary.defaultProps = {
  folders: []
}

FolderListPrimary.propTypes = {
  folders: PropTypes.array.isRequired,
}

export default FolderListPrimary;