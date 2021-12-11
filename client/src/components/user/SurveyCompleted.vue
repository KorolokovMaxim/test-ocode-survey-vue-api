<template>
  <div class="container">
    <h1>{{ completed.name }}</h1>
    <div class="questions-container">
      <div v-for="(question, i) in questions" :key="i" class="question-container">
        <div class="question-name">
          {{ question.question.name }}
        </div>
        <div class="answers-container">
          <div v-for="(answer, j) in question.answers" :key="j">
            {{ answer.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authHeader from "@/services/auth-header";

export default {
  name: "SurveyCompleted",
  data() {
    return {
      loading: true,
      questions: []
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    surveys() {
      return this.$store.state.survey.completed;
    },
    completed() {
      return this.surveys.filter((survey) => {
        return survey.id === Number(this.$route.params.survey);
      })[0];
    }
  },
  async mounted() {
    const response = await this.$axios.get(`http://localhost:8080/api/user/show-completed-survey/${this.completed.id}`, {
      headers: authHeader(this.user)
    });

    this.questions = response.data;
  }
}
</script>

<style scoped>
.questions-container {
  margin-top: 30px;
}

.question-container {
  margin: 20px 0;
}
</style>