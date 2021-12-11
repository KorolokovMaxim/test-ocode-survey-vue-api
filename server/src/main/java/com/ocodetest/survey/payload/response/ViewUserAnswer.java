package com.ocodetest.survey.payload.response;



import com.ocodetest.survey.entity.Answer;
import com.ocodetest.survey.entity.Question;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ViewUserAnswer {


    private Question question;
    private List<Answer> answers = new ArrayList<>();


    public void addAnswer(Answer answer) {
        this.answers.add(answer);
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ViewUserAnswer that = (ViewUserAnswer) o;
        return Objects.equals(question, that.question) && Objects.equals(answers, that.answers);
    }

    @Override
    public int hashCode() {
        return Objects.hash(question, answers);
    }
}
