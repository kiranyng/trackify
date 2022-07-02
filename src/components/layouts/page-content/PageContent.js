import React from 'react';

import './PageContent.css';

function PageContent(props) {
    return (
        <div className="Page-content">
            <div className='Page-header'>
                <h1>
                    {props.title}
                </h1>
                {props.tools}
            </div>
            {props.children}
        </div>
    );
}

export default PageContent;