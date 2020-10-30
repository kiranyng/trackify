import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './FolderBreadcrumbs.css';

const mapStateToProps = ( state, props ) => {
    const parentFolders =  [];

    let currentFolder = state.content[ state.content[props.folder].folder ];

    while( currentFolder.id !== '$' ) {
        parentFolders.push( currentFolder );

        currentFolder = state.content[ currentFolder.folder ];
    }

    return {
        parentFolders,
        ...props
    }
}

class FolderBreadcrumbs extends React.Component {
    render() {
        return (
            <ul className="Folder-breadcrumbs-container">
                <li> 
                    { ( this.props.folder !== '$' ) ? ( <Link to={ `/explore` } > Home </Link> ) : '' }
                    <span> / </span> 
                </li>
                {
                    this.props.parentFolders.slice(0).reverse().map( ( item, index ) => {
                        return (
                            <li key={ item.id }>
                                <Link to={ `/explore/${ item.id }` } >{ item.name }</Link>
                                <span> / </span>
                            </li>
                        )
                    } )
                }
            </ul>
        );
    }
}

export default connect( mapStateToProps )( FolderBreadcrumbs );