import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router";

export default function HomeRoute(){
    const navigate = useNavigate();
    return (
        <Stack flexDirection="column">
            <Typography paddingY={2} variant="h4">Are you Interved or Extroverted?<br /> Let's find out</Typography>
            <Typography paddingY={2} paragraph variant="body2">
                It's important to keep in mind that introversion and extraversion are not black-and-white categories, but rather a spectrum.
            </Typography>
            <Button onClick={e => navigate('/quiz')} sx={{ marginY: 6}} variant="contained">Start</Button>
        </Stack>
    );
}