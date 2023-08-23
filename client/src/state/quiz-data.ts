import { atom, atomFamily, selector, selectorFamily } from 'recoil';

// Replies - Map<question_id, answer_id> - AtomFamily
export const repliesState = atomFamily<ReplyType, string>({
    key: "quiz/replies",
    default: {}
});

export const isLoadingState = atom({
    key: "quiz/isLoading",
    default: false
});

export const repliesIdsState = atom<string[]>({
    key: "quiz/repliesIds",
    default: []
});
// Questions - Array<Question> - atom

export const repliesSelector = selector<Array<ReplyType>>({
    key: "quiz/repliesSelector",
    get: ({ get }) => {
        return get(repliesIdsState).map(id => get(repliesState(id)));
    }
})

export const questionsState = atom<Array<QuestionType>>({
    key: "quiz/questions",
    default: []
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
});