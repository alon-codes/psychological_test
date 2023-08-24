import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import Quiz from './routes/quiz';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { BrowserRouter, createBrowserRouter, HashRouter, MemoryRouter, Outlet, Route, Router, RouterProvider, Routes } from 'react-router-dom';
import Score from './routes/score';
import { Container } from '@mui/system';
import Header from './header';
import HomeRoute from './routes/home';
import { isLoadingState } from './state/quiz-data';
import LinearBuffer from './linear-buffer';
import Fab from '@mui/material/Fab';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import { blue, blueGrey } from '@mui/material/colors';

export function MainLayout() {
    const isLoading = useRecoilValue(isLoadingState);
    return (
        <Container maxWidth="md">
            <CssBaseline />
            <Header />
            {isLoading && <LinearBuffer />}
            <Outlet />
        </Container>
    );
}

export default function Main() {

    return (
        <React.StrictMode>
            <RecoilRoot>
                <Container maxWidth="md">
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route path="/" element={<HomeRoute />} />
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/score" element={<Score />} />
                        </Route>
                    </Routes>
                    <Fab
                        onClick={e => window.open('https://github.com/alon-codes/psychological_test', '_blank')}
                        style={{ position: 'fixed', right: 10, bottom: 10}} aria-label="like">
                        <IntegrationInstructionsIcon color="primary" />
                    </Fab>
                </Container>
            </RecoilRoot>
        </React.StrictMode>
    );
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render((
    <HashRouter>
        <Main />
    </HashRouter>
));