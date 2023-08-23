import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, List, ListItemButton, Button, Stack, Box } from '@mui/material';
import { indexToLetter } from '../utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentQuestionSelector, isLoadingState, questionIndexState, questionsState, repliesIdsState, repliesState } from '../state/quiz-data';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LinearBuffer from '../linear-buffer';

export default function Quiz() {
    const [questions, setQuestions] = useRecoilState(questionsState);
    const currentQuestion = useRecoilValue<QuestionType | undefined>(currentQuestionSelector);
    console.log({ currentQuestion });
    const [currentIndex, setCurrentIndex] = useRecoilState<number>(questionIndexState);
    const [currentReply, setCurrentReply] = useRecoilState(repliesState(currentQuestion?.id || ''));
    const navigate = useNavigate();
    const [repliesIds, setIds] = useRecoilState(repliesIdsState);

    const [,setLoading] = useRecoilState<boolean>(isLoadingState);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                setLoading(true);
                const resposne = await axios.get(import.meta.env.VITE_SERVER_URL + "/quiz/");
                console.log({ resposne });
                if (!!resposne.data) {
                    setQuestions(resposne.data)
                }
                setLoading(false);
            }
            catch (e) {

            }
        }

        fetchQuestions();
    }, [])

    const nextQuestion = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            // TODO - handle submit
        }
    };

    const prevQuestion = () => {
        if (currentIndex - 1 > -1) {
            setCurrentIndex(currentIndex - 1);
        } else {
            // TODO - handle submit
        }
    };

    const changeReply = (ans: AnswerType) => {
        console.log({ ans });
        if (!!currentQuestion?.id) {
            setCurrentReply({
                selected_answer_id: ans.id,
                question_id: currentQuestion.id
            });
            setIds([...repliesIds, currentQuestion.id])
        }

    }

    const submitQuiz = () => {
        navigate('/score');
    };

    return (
        <Grid container>
            <Stack alignContent="center" flexDirection="column" sx={{ width: "100%" }}>
                <Box>
                    <Typography variant="body2">
                        {`${currentIndex + 1}/${questions.length}`}
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{ paddingY: 3 }} variant="h5">
                        {currentQuestion?.title}
                    </Typography>
                </Box>

            </Stack>

            <List sx={{ width: "100%" }}>
                {currentQuestion?.options?.map((currentAnswer, index) => (
                    <ListItemButton disableRipple selected={currentReply.selected_answer_id === currentAnswer.id} onClick={e => changeReply(currentAnswer)} key={currentAnswer.id}>
                        <Stack alignItems="center" flexDirection="row" alignContent="space-between" sx={{ width: "100%" }}>
                            <Button size="small" disableRipple disableTouchRipple color="info" variant={currentReply.selected_answer_id !== currentAnswer.id ? "outlined" : "contained"}>{indexToLetter(index)}</Button>
                            <Typography px={2} py={2} my={2} variant="body2">{currentAnswer.text}</Typography>
                        </Stack>
                    </ListItemButton>
                ))}
            </List>
            <Container maxWidth="md" sx={{ paddingY: 2, position: 'sticky', bottom: 0, justifyContent: "space-around", alignItems: "flex-end", display: "flex" }}>
                {currentIndex > 0 && (
                    <Button onClick={e => prevQuestion()} variant="text">Prev question</Button>
                )}
                {currentIndex !== questions.length - 1 ? (
                    <Button disabled={!currentReply.selected_answer_id} fullWidth={currentIndex === 0} onClick={e => nextQuestion()} variant="text">
                        Next question
                    </Button>
                ) : (
                    <Button fullWidth={currentIndex === 0} onClick={e => submitQuiz()} variant="text">
                        Submit
                    </Button>
                )}

            </Container>

        </Grid>
    );
}