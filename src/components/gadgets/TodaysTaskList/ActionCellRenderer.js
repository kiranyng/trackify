import React from 'react';

import ActionIcon from '../../layouts/action-icon/ActionIcon';

const ActionGridCellRender = (props)  => {
    return (
        <div>
            <ActionIcon type='play'>Start</ActionIcon>
            <ActionIcon type='accept'>Accept</ActionIcon>
            <ActionIcon type='reject'>Reject</ActionIcon>
        </div>
    );
}

export default ActionGridCellRender;