export interface QuestionnaireCreate {
    userEmail: string;
    answers: string;
}

export interface QuestionnaireResponse {
    filledQuestionnaire: Questionnaire;
    template: Template;
}

export interface Questionnaire {
    id: number;
    user: {email: string;};
    answers: string;
}

interface Template {
    id: number;
    data: string;
}

export interface Question {
    question: string;
    answer: string;
}
