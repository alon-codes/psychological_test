import React, { useState } from 'react';
import { Typography, Container, Grid, List, ListItem, ListItemButton, Button } from '@mui/material';
import { indexToLetter } from './utils';

interface AnswerType {
    id: string;
    text: string;
}

interface QuestionType {
    id: string;
    title: String;
    answers: AnswerType [];
}

const questions: Array<QuestionType> = [
    {
        id: "random_q1",
        title: "You`re really busy at work and a colleague is telling you their life story and personal woes. You:",
        answers: [
            {
                id: "random_q1_a1",
                text: "Don`t dare to interrupt them"
            },
            {
                id: "random_q1_a2",
                text: "Think it`s more important to give them some of your time; work can wait"
            },
            {
                id: "random_q1_a3",
                text: "Listen, but with only with half an ear"
            },
            {
                id: "random_q1_a4",
                text: "Interrupt and explain that you are really busy at the moment"
            }
        ]
    }
]

export default function Quiz(){
    const [ currentQuestion, setCurrentQuestion ] = useState<QuestionType>(questions[0]);
    const [ selectedAnswer, setSelectedAnswer ] = useState<AnswerType>();

    return (
        <Container maxWidth="md">
            <Typography sx={{ paddingY: 3}} variant="h5">
                {currentQuestion?.title}
            </Typography>
            <List>
                {currentQuestion.answers.map((currentAnswer, index) => (
                    <ListItemButton selected={selectedAnswer?.id === currentAnswer.id} onClick={e => setSelectedAnswer(currentAnswer)} key={currentAnswer.id}>
                        <Button size="small" disableRipple disableTouchRipple color="info" variant="outlined">{indexToLetter(index)}</Button>
                        <Typography px={2} py={2} my={2} variant="body2">{currentAnswer.text}</Typography>
                    </ListItemButton>
                ))}
            </List>
        </Container>
    )
}