import { Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";

export default function Score(){

    useEffect(() => {

    }, [])

    return (
        <Grid container py={4}>
            <Typography variant="h5"><b>Score:</b> Introverted ? Extraverted</Typography>
        </Grid>
    );
}