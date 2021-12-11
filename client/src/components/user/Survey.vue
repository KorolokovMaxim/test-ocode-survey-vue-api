<template>
  <div v-if="!loading" class="survey">
    <h2 class="survey-name">{{ survey.name }}</h2>
    <div class="questions">
      <div v-for="(question, i) in questions" :key="i">
        <h3 class="question">{{ question.question.name }}</h3>
        <div v-for="(answer, j) in question.answerList" :key="j">
          <input class="answer-input" type="checkbox" :id="answer.id" @change="onChange($event, answer)">
          <label :for="answer.id">{{ answer.name }}</label>
        </div>
      </div>
      <button class="completed-answer-button" v-if="questions.length !== 0" @click="answer">Ответить</button>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import authHeader from "@/services/auth-header";

export default {
  name: "Survey",
  data() {
    return {
      loading: true,
      questions: [],
      answers: [],
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    survey() {
      return this.$store.state.survey.surveys.filter((survey) => {
        return survey.id === Number(this.$route.params.id);
      })[0];
    },
  },
  methods:{
    onChange(event, answer) {
      if (event.currentTarget.checked) {
        this.answers.push(answer.id);
      } else {
        this.answers = this.answers.filter((id) => {
          return id !== answer.id;
        });
      }
    },
    async answer() {
      await this.$axios.post(`http://localhost:8080/api/user/survey/${this.survey.id}/saveCompletedSurvey`, {
        answers: this.answers
      }, {
        headers: authHeader(this.user)
      });

      await this.$router.push({ name: 'survey-completed', params: { survey: this.survey.id }});
    }
  },
  async mounted() {
    const response = await this.$axios.get(`http://localhost:8080/api/user/survey/${this.survey.id}`, {
      headers: authHeader(this.user)
    });

    this.questions = response.data;

    this.loading = false;
  },
}
</script>

<style scoped>
.container .list-group .list-group-item {
  position: relative;
}
.container .list-group .list-group-item .delete-button {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  color: red;
}
.survey-name{
  margin-top: 25px;
}
.question{
  margin-top: 12px;
  margin-bottom: 12px;
}
.answer-input{
  margin-right: 12px;
}
.completed-answer-button{
  padding: 0 5%;
  background: #e92d6a;
  border: none;
  color: wheat;
  margin-top: 15px;
  margin-bottom: 35px;
}
</style>