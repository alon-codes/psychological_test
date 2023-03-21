export { AnswerType, ReplyType, QuestionType};

declare global {
    interface AnswerType {
        id: string;
         text: string;
    }

    interface ReplyType {
        question_id: string;
        selected_answer_id: string;
    }
    
    interface QuestionType {
        id: string;
         title: String;
        answers: AnswerType [];
    }

    interface ResultResponseType {
        result: ResultType
    }

    enum ResultType {
        Intervted,
        Extraverted,
        
    }
}