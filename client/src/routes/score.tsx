import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import axios from 'axios';

export default function Score(){

    useEffect(() => {
        const fetchData = async () => {
            const response = axios.post(import.meta.env.VITE_SERVER_URL + '/quiz/submit');
            console.log({ response });
        }

        fetchData();
    }, [])

    return (
        <Grid container py={4}>
            <Typography variant="h5"><b>Score:</b> Introverted ? Extraverted</Typography>
        </Grid>
    );
}