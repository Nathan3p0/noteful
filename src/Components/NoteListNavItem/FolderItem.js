import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FolderItem.css'

const FolderItem = (props) => {
    
    return ( 
        <li className="folderItem" id={props.id}>
            <NavLink to={`/folder/${props.id}`}>{props.name}</NavLink>
        </li>
     );
}

FolderItem.propTypes = {
    id : PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}
 
export default FolderItem;