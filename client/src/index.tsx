import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Quiz from './routes/quiz';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Score from './routes/score';
import { Container } from '@mui/system';
import Header from './header';
import HomeRoute from './routes/home';

const router = createBrowserRouter([
    {
        path: "/quiz",
        element: <Quiz />,
    },
    {
        path: "/",
        element: <HomeRoute />,
    },
    {
        path: "/score",
        element: <Score />,
    },
]);

export default function Main() {
    return (
        <React.StrictMode>
            <RecoilRoot>
                <Container maxWidth="md">
                    <CssBaseline />
                    <Header />
                    <RouterProvider router={router} />
                </Container>
            </RecoilRoot>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(<Main />);