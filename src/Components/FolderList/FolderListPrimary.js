import React, { useContext } from 'react';
import FolderListItem from '../FolderListItem/FolderListItem';
import { NotefulContext } from '../NotefulContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FolderListPrimary.css'

const FolderListPrimary = (props) => {
  const value = useContext(NotefulContext);
  const folder = value.folders.map((folder) => (
    <FolderListItem key={folder.id} id={folder.id} name={folder.name} />
  ))
  return (
    <>
      <ul className="folderNavList">
        {folder}
      </ul>
      <div className="navBtnWrapper">
        <button><Link to="/addfolder">Add folder</Link></button>
      </div>
    </>
  );
}

FolderListPrimary.defaultProps = {
  folders: []
}

FolderListPrimary.propTypes = {
  folders: PropTypes.array.isRequired,
}

export default FolderListPrimary;