import authHeader from "@/services/auth-header";
import axios from "axios";

export const answers = {
    namespaced: true,
    state: {
        answers: []
    },
    actions: {
        async createAnswer({commit}, data) {
            const response = await axios.post(`http://localhost:8080/api/admin/question/${data.question.id}/create-answer`, {
                name: data.name,
            }, {
                headers: authHeader(data.user)
            });

            commit('setAnswer', response.data);
        },
        async loadAnswers({commit}, data) {
            const response = await axios.get(`http://localhost:8080/api/admin/question/${data.question.id}/allAnswers`, {
                headers: authHeader(data.user)
            });

            commit('replacementAnswers', response.data);
        },
        async deleteAnswer({commit}, data) {
            await axios.delete(`http://localhost:8080/api/admin/answer/delete/${data.answer.id}`,{
                headers: authHeader(data.user)
            });

            commit('removeAnswer', data.answer);
        },
    },
    mutations: {
        replacementAnswers(state, answers) {
            state.answers = answers;
        },
        setAnswer(state, answer) {
            state.answers.push(answer);
        },
        removeAnswer(state, answer) {
            state.answers = state.answers.filter((a) => {
                return a.id !== answer.id;
            });
        },
    }
}