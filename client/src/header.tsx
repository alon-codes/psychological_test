import { Grid } from "@mui/material";
import React from "react";

export default function Header(){
    return (
        <Grid py={2} container justifyContent="center" width="100%">
            <img width="auto" height="175px" src="images/ilustration.jpg" />
        </Grid>
    );
}