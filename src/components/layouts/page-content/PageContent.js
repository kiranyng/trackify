import React from 'react';

import './PageContent.css';

function PageContent(props) {
    return (
        <div className="Page-content">
            <h1>
                {props.title}
            </h1>
            {props.children}
        </div>
    );
}

export default PageContent;