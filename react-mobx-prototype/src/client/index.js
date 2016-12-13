import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './views/AppRouter';
import {useStrict} from 'mobx';

useStrict(true);
ReactDOM.render(
        <AppRouter />,
    document.getElementById('page-container-div')
);
