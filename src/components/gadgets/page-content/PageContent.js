import React from 'react';

function PageContent(props) {
    return (
        <article>
            <header>
                {props.title}
            </header>
            <div>
                {props.children}
            </div>
        </article>
    );
}

export default PageContent;