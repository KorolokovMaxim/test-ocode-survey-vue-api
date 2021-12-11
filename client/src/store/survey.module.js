import authHeader from "@/services/auth-header";
import axios from "axios";

export const survey = {
    namespaced: true,
    state: {
        surveys: [],
        completed: [],
    },
    actions: {
        async createSurvey({commit}, data) {
            const response = await axios.post('http://localhost:8080/api/admin/create-survey', {
                name: data.name,
            }, {
                headers: authHeader(data.user)
            });

            commit('setSurvey', response.data);
        },
        async loadSurveys({commit}, data) {
            const path = data.user.roles.includes('ROLE_ADMIN')
                ? 'http://localhost:8080/api/admin/get-all-surveys'
                : 'http://localhost:8080/api/user/get-all-surveys';

            const response = await axios.get(path, {
                headers: authHeader(data.user)
            });

            commit('replacementSurveys', response.data);
        },
        async loadCompleted({commit}, data) {
            const response = await axios.get('http://localhost:8080/api/user/completed-surveys', {
                headers: authHeader(data.user)
            });

            commit('setCompleted', response.data);
        },
        async deleteSurvey({commit}, data) {
          const response = await axios.delete(`http://localhost:8080/api/admin/survey/delete/${data.survey.id}`,{
              headers: authHeader(data.user)
          });

          commit('removeSurvey', response.data);
        },
        async createQuestion({commit}, data) {
            const response = await axios.post(`http://localhost:8080/api/admin/survey/${data.surveyId}/create-question/`, {
                name: data.name,
            }, {
                headers: authHeader(data.user)
            });

            commit('createQuestion', {
                surveyId: data.surveyId,
                question: response.data
            });
        },
        async deleteQuestion({commit}, data) {
            await axios.delete(`http://localhost:8080/api/admin/question/delete/${data.question.id}`,{
                headers: authHeader(data.user)
            });

            commit('removeQuestion', data.question);
        }
    },
    mutations: {
        replacementSurveys(state, surveys) {
            state.surveys = surveys;
        },
        setCompleted(state, surveys) {
            state.completed = surveys;
        },
        setSurvey(state, survey) {
            state.surveys.push(survey);
        },
        removeSurvey(state, survey) {
            state.surveys = state.surveys.filter((s) => {
                return s.id !== survey.id;
            });
        },
        createQuestion(state, data) {
            const survey = state.surveys.filter((survey) => {
                return survey.id === data.surveyId;
            })[0]

            survey.questions.push(data.question);
        },
        removeQuestion(state, question) {
            state.surveys.forEach((survey) => {
                survey.questions = survey.questions.filter((q) => {
                    return q.id !== question.id
                });

                return survey;
            });
        }
    }
}