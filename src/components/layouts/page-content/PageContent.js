import React from 'react';

import './PageContent.css';

function PageContent(props) {
    return (
        <article className="Page-content">
            <header>
                {props.title}
            </header>
            {props.children}
        </article>
    );
}

export default PageContent;