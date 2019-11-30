import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FolderListItem.css'

const FolderListItem = (props) => {

    return (
        <li className="folderItem" id={props.id}>
            <NavLink to={`/folder/${props.id}`}>{props.name}</NavLink>
        </li>
    );
}

FolderListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

export default FolderListItem;