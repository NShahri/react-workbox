// @flow

import React from 'react';

import UpdateActivated from './UpdateActivated';

const UpdateActivatedReload = () => {
    return (
        <UpdateActivated>
            {isUpdateActivated => {
                if (isUpdateActivated) {
                    window.location.reload(true);
                }

                return null;
            }}
        </UpdateActivated>
    );
};

export default UpdateActivatedReload;
