import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Quiz from './quiz';
import ReactDOM from 'react-dom/client';

export default function Main() {
    return (
        <>
            <CssBaseline />
            <Quiz />
        </>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(<Main />);