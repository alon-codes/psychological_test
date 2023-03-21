import React from 'react';
import { Typography, Container, Grid, List, ListItemButton, Button, Stack } from '@mui/material';
import { indexToLetter } from './utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentQuestionSelector, questionIndexState, questionsState, replies } from './state/quiz-data';
import { useNavigate } from "react-router-dom";
import Header from './header';

export default function Quiz(){
    const questions = useRecoilValue(questionsState);
    const currentQuestion = useRecoilValue<QuestionType>(currentQuestionSelector);
    const [ currentIndex, setCurrentIndex ] = useRecoilState<number>(questionIndexState);
    const [currentReply, setCurrentReply] = useRecoilState(replies(currentQuestion.id));
    const navigate = useNavigate();

    const nextQuestion = () => {
        if(currentIndex + 1 < questions.length){
            setCurrentIndex(currentIndex + 1);
        } else {
            // TODO - handle submit
        }
    };

    const prevQuestion = () => {
        if(currentIndex - 1 > -1){
            setCurrentIndex(currentIndex - 1);
        } else {
            // TODO - handle submit
        }
    };

    const changeReply = (ans: AnswerType) => {
        setCurrentReply({
            selected_answer_id: ans.id,
            question_id: currentQuestion.id
        })
    }

    const submitQuiz = () => {
        navigate('/score');
    }

    return (
        <Grid container>
            <Typography sx={{ paddingY: 3}} variant="h5">
                {currentQuestion?.title}
            </Typography>
            <List sx={{ width: "100%"}}>
                {currentQuestion.answers.map((currentAnswer, index) => (
                    <ListItemButton disableRipple selected={currentReply.selected_answer_id === currentAnswer.id} onClick={e => changeReply(currentAnswer)} key={currentAnswer.id}>
                        <Button size="small" disableRipple disableTouchRipple color="info" variant={currentReply.selected_answer_id !== currentAnswer.id ? "outlined" : "contained" }>{indexToLetter(index)}</Button>
                        <Typography px={2} py={2} my={2} variant="body2">{currentAnswer.text}</Typography>
                    </ListItemButton>
                ))}
            </List>
            <Container maxWidth="md" sx={{ paddingY: 2, position: 'fixed', bottom: 0, justifyContent: "space-between", display: "flex"}}>
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
    )
}