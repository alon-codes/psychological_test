import { atom, atomFamily, selector, selectorFamily } from 'recoil';

// Replies - Map<question_id, answer_id> - AtomFamily

export const replies = atomFamily<ReplyType, string>({
    key: "quiz/replies",
    default: {} as ReplyType
})

// Questions - Array<Question> - atom

export const questionsState = atom<Array<QuestionType>>({
    key: "quiz/replies",
    default: [
        {
            id: "q1",
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
        },
        {
            id: "q2",
             title: "You`re really busy at work and a colleague is telling you their life story and personal woes. You:",
            answers: [
                {
                    id: "random_q1_a1",
                     text: "Don`t dare to interrupt them"
                },
                {
                    id: "random_q1_a2",
                     text: "Think it`s more important to give them some of your time; work can wait"
                }
            ]
        },
        {
            id: "q3",
             title: "You`re really busy at work and a colleague is telling you their life story and personal woes. You:",
            answers: [
                {
                    id: "random_q1_a1",
                     text: "Don`t dare to interrupt them"
                },
                {
                    id: "random_q1_a2",
                     text: "Think it`s more important to give them some of your time; work can wait"
                }
            ]
        },
        {
            id: "q4",
             title: "4",
            answers: [
                {
                    id: "random_q1_a1",
                     text: "Don`t dare to interrupt them"
                },
                {
                    id: "random_q1_a2",
                     text: "Think it`s more important to give them some of your time; work can wait"
                }
            ]
        },
        {
            id: "q5",
             title: "5",
            answers: [
                {
                    id: "random_q1_a1",
                     text: "Don`t dare to interrupt them"
                },
                {
                    id: "random_q1_a2",
                     text: "Think it`s more important to give them some of your time; work can wait"
                }
            ]
        },
        {
            id: "q6",
             title: "6",
            answers: [
                {
                    id: "random_q1_a1",
                     text: "Don`t dare to interrupt them"
                },
                {
                    id: "random_q1_a2",
                     text: "Think it`s more important to give them some of your time; work can wait"
                }
            ]
        }
    ]
})

export const questionIndexState = atom<number>({
    key: "quiz/questionIndex",
    default: 0
})

export const currentQuestionSelector = selector<QuestionType>({
    key: "quiz/currentQuestion",
    get: ({ get }) => {
        const index = get(questionIndexState);
        return get(questionsState)[index];
    }
})