import authHeader from "@/services/auth-header";
import axios from "axios";

export const users = {
    namespaced: true,
    state: {
        users: [],
        completedSurvey: []
    },
    actions: {
        async loadUsers({commit}, data) {
            const response = await axios.get(`http://localhost:8080/api/admin/users/get-all-users`, {
                headers: authHeader(data.user)
            });

            commit('replacementUsers', response.data);
        },
        async loadCompletedSurvey({commit}, data) {
            const response = await axios.get(`http://localhost:8080/api/admin/get-completed-user-survey/${data.current.id}/${data.survey.id}`, {
                headers: authHeader(data.user)
            });

            commit('replacementCompletedSurvey', response.data);
        },

    },
    mutations: {
        replacementUsers(state, users) {
            state.users = users;
        },
        replacementCompletedSurvey(state, survey) {
            state.completedSurvey = survey;
        },
    }
}