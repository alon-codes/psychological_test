import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect, useState } from 'react';
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
import { Box, Link, Stack, Tooltip, Typography, Zoom, colors } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import { useTheme } from '@mui/material/styles';

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



// TODO - extract to external library (Bit or similar)
export function SourceCodeFab({ animate = true }) {
    const theme = useTheme();
    const [isShown, setShown] = useState(true);

    useEffect(() => {
        const tm = setTimeout(() => setShown(false), 500);
        return () => clearTimeout(tm);
    }, []);

    return (
        <Box>
            <Tooltip title="Source Code" placement="left">
                <Fab
                    color="primary"
                    size="medium"
                    sx={{ position: "fixed", bottom: theme.spacing(2), right: theme.spacing(2) }}
                    aria-label="Source Code">
                    <Link rel="noreferrer" target="_blank" href="https://github.com/alon-codes/psychological_test">
                        <CodeOutlinedIcon sx={{ marginTop: 1, color: colors.lime[50] }} />
                    </Link>
                </Fab>
            </Tooltip>
        </Box>
    )
}

export default function Main() {

    return (
        <React.StrictMode>
            <RecoilRoot>
                <Container sx={{ position: "relative" }} maxWidth="md">
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route path="/" element={<HomeRoute />} />
                            <Route path="/quiz" element={<Quiz />} />
                            <Route path="/score" element={<Score />} />
                        </Route>
                    </Routes>
                    <SourceCodeFab />

                    <Stack marginY={2}>
                        <Typography textAlign="center" variant='caption'>Created by <Link target="_blank" href="https://github.com/alon-codes">@alon-codes</Link></Typography>
                    </Stack>

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