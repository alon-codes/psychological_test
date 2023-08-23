import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Quiz from './routes/quiz';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Score from './routes/score';
import { Container } from '@mui/system';
import Header from './header';
import HomeRoute from './routes/home';
import { isLoadingState } from './state/quiz-data';
import LinearBuffer from './linear-buffer';

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
    const loading = useRecoilValue(isLoadingState);

    return (
        <React.StrictMode>
            <RecoilRoot>
                <Container maxWidth="md">
                    <CssBaseline />
                    <Header />
                    {loading ? <LinearBuffer /> :
                        <RouterProvider router={router} />
                    }
                </Container>
            </RecoilRoot>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(<Main />);