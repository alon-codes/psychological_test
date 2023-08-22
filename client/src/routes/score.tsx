import { Grid, LinearProgress, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useRecoilCallback, useRecoilRefresher_UNSTABLE, useRecoilValue, useResetRecoilState } from "recoil";
import { questionIndexState, repliesIdsState, repliesSelector, repliesState } from "../state/quiz-data";

enum Values {
    uknonwn = 'uknonwn',
    ambivert = 'ambivert',
    introverted = 'introverted',
    extroverted = 'extroverted'
}

export default function Score() {

    const replies = useRecoilValue(repliesSelector);
    const [loading, setLoading] = useState<boolean>(true);
    const [score, setScore] = useState<Values>(Values.uknonwn);

    // TODO - consider to export to different file
    const resetQuiz = useRecoilCallback(({ snapshot, reset, set }) => () => {
        for (const curId in snapshot.getLoadable(repliesIdsState)) {
            reset(repliesState(curId));
        }

        set(repliesIdsState, []);
        reset(questionIndexState);
    });

    useEffect(() => {
        console.log({ replies })
        const fetchData = async () => {
            if (!!replies.length) {
                try {
                    const { data } = await axios.post(import.meta.env.VITE_SERVER_URL + '/quiz/submit/', {
                        replies
                    });

                    if(!!data){
                        setScore(data.score)
                    }
                    setLoading(false);
                    resetQuiz();
                }
                catch (e) {

                }
            }
        }

        fetchData();
    }, [])

    return (
        <Grid container py={4}>

            {!!loading ? (
                <LinearProgress />
            ) : (
                <Typography variant="h5">
                    <b>Score:</b> {score}
                </Typography>
            )}
        </Grid>
    );
}
