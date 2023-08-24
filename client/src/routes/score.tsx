import { Grid, LinearProgress, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import axios from 'axios';
import { useRecoilCallback, useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { isLoadingState, questionIndexState, repliesIdsState, repliesSelector, repliesState } from "../state/quiz-data";
import { useNavigate } from "react-router";

enum Values {
    uknonwn = 'uknonwn',
    ambivert = 'ambivert',
    introverted = 'introverted',
    extroverted = 'extroverted'
}

export default function Score() {

    const replies = useRecoilValue(repliesSelector);
    const [isLoading,setLoading] = useRecoilState<boolean>(isLoadingState);
    const [score, setScore] = useState<Values>(Values.uknonwn);
    const navigate = useNavigate();

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
                    setLoading(true);
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
            } else {
                navigate('/quiz');
            }
        }

        fetchData();
    }, [])

    return (
        <Grid container py={4}>
            <Typography variant="h5">
                {!!score && !isLoading ? <Typography><b>Score:</b> {score}</Typography> : <Typography textAlign="center">Calculating your score...</Typography> }
            </Typography>
        </Grid>
    );
}
